/**
 * TRAVIA DUBAI — Auth Store (Zustand)
 * Manages authentication state, profile data, and role-based routing
 */

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export type UserRole = 'customer' | 'admin' | 'concierge' | 'operations';

export interface Profile {
  id: string;
  company_id: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  country: string | null;
  preferred_language: string;
  is_active: boolean;
}

export interface CustomerAccess {
  id: string;
  customer_id: string;
  username: string;
  is_active: boolean;
  must_change_password: boolean;
}

interface AuthState {
  // State
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  customerAccess: CustomerAccess | null;
  customerId: string | null;
  isLoading: boolean;
  isInitialized: boolean;

  // Computed
  isAuthenticated: boolean;
  isCustomer: boolean;
  isStaff: boolean;
  mustChangePassword: boolean;

  // Actions
  initialize: () => Promise<void>;
  signIn: (username: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<{ error?: string }>;
  setProfile: (profile: Profile) => void;
  setCustomerAccess: (access: CustomerAccess | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  session: null,
  user: null,
  profile: null,
  customerAccess: null,
  customerId: null,
  isLoading: true,
  isInitialized: false,

  // Computed (re-derived on state changes)
  isAuthenticated: false,
  isCustomer: false,
  isStaff: false,
  mustChangePassword: false,

  // ─── Initialize ─────────────────────────────────────
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        let customerAccess: CustomerAccess | null = null;
        let customerId: string | null = null;

        if (profile?.role === 'customer') {
          customerAccess = await fetchCustomerAccess(session.user.id);
          customerId = customerAccess?.customer_id ?? null;
        }

        set({
          session,
          user: session.user,
          profile,
          customerAccess,
          customerId,
          isAuthenticated: true,
          isCustomer: profile?.role === 'customer',
          isStaff: profile?.role !== 'customer',
          mustChangePassword: customerAccess?.must_change_password ?? false,
          isLoading: false,
          isInitialized: true,
        });
      } else {
        set({
          isLoading: false,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Auth initialize error:', error);
      set({ isLoading: false, isInitialized: true });
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        set({
          session: null,
          user: null,
          profile: null,
          customerAccess: null,
          customerId: null,
          isAuthenticated: false,
          isCustomer: false,
          isStaff: false,
          mustChangePassword: false,
        });
      }
    });
  },

  // ─── Sign In ────────────────────────────────────────
  signIn: async (username: string, password: string) => {
    set({ isLoading: true });
    try {
      // Convert username to internal email format for Supabase Auth
      const email = `${username.toLowerCase().trim()}@travia.internal`;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false });
        return { error: 'auth.invalidCredentials' };
      }

      if (!data.session || !data.user) {
        set({ isLoading: false });
        return { error: 'auth.invalidCredentials' };
      }

      // Fetch profile
      const profile = await fetchProfile(data.user.id);
      if (!profile || !profile.is_active) {
        await supabase.auth.signOut();
        set({ isLoading: false });
        return { error: 'auth.accountDisabled' };
      }

      // Fetch customer access if customer
      let customerAccess: CustomerAccess | null = null;
      let customerId: string | null = null;

      if (profile.role === 'customer') {
        customerAccess = await fetchCustomerAccess(data.user.id);
        if (!customerAccess?.is_active) {
          await supabase.auth.signOut();
          set({ isLoading: false });
          return { error: 'auth.accountDisabled' };
        }
        customerId = customerAccess.customer_id;

        // Log login activity
        await logActivity(profile.company_id, data.user.id, customerId, 'login');

        // Update last_login_at
        await supabase
          .from('customer_access')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', customerAccess.id);
      }

      set({
        session: data.session,
        user: data.user,
        profile,
        customerAccess,
        customerId,
        isAuthenticated: true,
        isCustomer: profile.role === 'customer',
        isStaff: profile.role !== 'customer',
        mustChangePassword: customerAccess?.must_change_password ?? false,
        isLoading: false,
      });

      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      set({ isLoading: false });
      return { error: 'common.errorGeneric' };
    }
  },

  // ─── Sign Out ───────────────────────────────────────
  signOut: async () => {
    await supabase.auth.signOut();
    set({
      session: null,
      user: null,
      profile: null,
      customerAccess: null,
      customerId: null,
      isAuthenticated: false,
      isCustomer: false,
      isStaff: false,
      mustChangePassword: false,
    });
  },

  // ─── Change Password ───────────────────────────────
  changePassword: async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error: 'common.errorGeneric' };
      }

      // Update must_change_password flag
      const { customerAccess } = get();
      if (customerAccess) {
        await supabase
          .from('customer_access')
          .update({ must_change_password: false })
          .eq('id', customerAccess.id);

        set({
          customerAccess: { ...customerAccess, must_change_password: false },
          mustChangePassword: false,
        });
      }

      return {};
    } catch (error) {
      return { error: 'common.errorGeneric' };
    }
  },

  setProfile: (profile) => set({ profile }),
  setCustomerAccess: (access) =>
    set({
      customerAccess: access,
      mustChangePassword: access?.must_change_password ?? false,
    }),
}));

// ─── Helpers ──────────────────────────────────────────────────

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Fetch profile error:', error);
    return null;
  }
  return data as Profile;
}

async function fetchCustomerAccess(authUserId: string): Promise<CustomerAccess | null> {
  const { data, error } = await supabase
    .from('customer_access')
    .select('id, customer_id, username, is_active, must_change_password')
    .eq('auth_user_id', authUserId)
    .single();

  if (error) {
    console.error('Fetch customer access error:', error);
    return null;
  }
  return data as CustomerAccess;
}

async function logActivity(
  companyId: string,
  userId: string,
  customerId: string | null,
  type: string
) {
  try {
    await supabase.from('activities').insert({
      company_id: companyId,
      user_id: userId,
      customer_id: customerId,
      type,
      description: `User logged in`,
    });
  } catch (error) {
    // Non-critical, don't throw
    console.error('Log activity error:', error);
  }
}

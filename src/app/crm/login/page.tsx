'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { TravelButton } from '@/components/ui/travel/TravelButton';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/crm';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    errorParam === 'unauthorized' ? 'Bu alana erişim yetkiniz yok.' : ''
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Geçersiz e-posta veya şifre.');
        setLoading(false);
        return;
      }

      // Verify staff role
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('Oturum oluşturulamadı.');
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role, is_active')
        .eq('id', user.id)
        .single();

      if (!profile || profile.role === 'customer' || !profile.is_active) {
        await supabase.auth.signOut();
        setError('CRM erişim yetkiniz yok. Yalnızca yetkili personel giriş yapabilir.');
        setLoading(false);
        return;
      }

      setLoading(false);
      router.push(redirect);
      router.refresh();
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    document.cookie = 'travia_staff_session=demo; path=/; max-age=86400';
    router.push(redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070F] relative overflow-hidden px-4">
      <div className="w-full max-w-[400px] relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-[#C9A66B]/15 border border-[#C9A66B]/25 flex items-center justify-center text-[#C9A66B] mx-auto shadow-sm">
            <Lock className="w-4 h-4" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-[#F5F1E8]">
            TRAVEL OS
          </h1>
          <p className="text-xs font-mono uppercase tracking-wider text-[#C9A66B]">
            Yetkili Personel Giriş Kapısı
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0B0F1A] border border-[#C9A66B]/20 rounded-2xl p-7 shadow-2xl space-y-5">
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-[#C9A66B] uppercase mb-1.5">
                Personel E-Postası
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="edip@traviadubai.com"
                className="w-full rounded-lg bg-[#111827] border border-[#C9A66B]/15 px-3.5 py-2.5 text-xs text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:border-[#C9A66B]/50 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider text-[#C9A66B] uppercase mb-1.5">
                Güvenlik Şifresi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-lg bg-[#111827] border border-[#C9A66B]/15 px-3.5 py-2.5 pr-10 text-xs text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:border-[#C9A66B]/50 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F5F1E8]/30 hover:text-[#C9A66B] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <TravelButton
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? 'Doğrulanıyor...' : 'Güvenli Giriş Yap'}
            </TravelButton>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#C9A66B]/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#0B0F1A] px-2 text-[#F5F1E8]/20 font-mono text-[10px]">VEYA</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full py-2.5 rounded-lg bg-[#111827] border border-[#C9A66B]/20 text-[#C9A66B] text-xs font-medium hover:bg-[#C9A66B]/10 transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Hızlı İnceleme (Demo Oturumu)
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-[#F5F1E8]/30 font-mono">
          TravelOS v2.4 · 256-Bit UHNW Şifreleme
        </p>
      </div>
    </div>
  );
}

export default function CrmLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#05070F]">
          <div className="w-6 h-6 border-2 border-[#C9A66B]/30 border-t-[#C9A66B] rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

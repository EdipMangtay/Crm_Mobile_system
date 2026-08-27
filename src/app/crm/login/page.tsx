'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

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
      const { data: { user } } = await supabase.auth.getUser();
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

      router.push(redirect);
      router.refresh();
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070F] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#C9A66B]/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#1B3A6B]/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[420px] mx-4 relative z-10">
        {/* Brand */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl tracking-[0.15em] text-[#F5F1E8] mb-1">
            TRAVIA
          </h1>
          <p className="text-xs tracking-[0.3em] text-[#C9A66B] uppercase font-medium">
            Ultimate CRM
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0B0F1A]/80 backdrop-blur-xl border border-[#C9A66B]/15 rounded-2xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#C9A66B]/10 border border-[#C9A66B]/20 mx-auto mb-6">
            <Lock className="w-5 h-5 text-[#C9A66B]" />
          </div>

          <h2 className="text-lg text-[#F5F1E8] text-center font-medium mb-1">
            Personel Girişi
          </h2>
          <p className="text-xs text-[#F5F1E8]/40 text-center mb-6">
            Travia CRM&apos;e erişmek için giriş yapın
          </p>

          {error && (
            <div className="flex items-start gap-2.5 p-3 mb-5 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-300 leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-wider text-[#C9A66B] uppercase mb-1.5">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-xl bg-[#111827] border border-[#C9A66B]/15 px-4 py-3 text-sm text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:border-[#C9A66B]/50 focus:outline-none focus:ring-1 focus:ring-[#C9A66B]/20 transition-all"
                placeholder="ornek@traviadubai.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono tracking-wider text-[#C9A66B] uppercase mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl bg-[#111827] border border-[#C9A66B]/15 px-4 py-3 pr-10 text-sm text-[#F5F1E8] placeholder-[#F5F1E8]/20 focus:border-[#C9A66B]/50 focus:outline-none focus:ring-1 focus:ring-[#C9A66B]/20 transition-all"
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-[#C9A66B] to-[#E8C77A] text-[#05070F] text-sm font-semibold tracking-wide hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(201,166,107,0.25)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#05070F]/30 border-t-[#05070F] rounded-full animate-spin" />
                  Giriş yapılıyor...
                </span>
              ) : (
                'Giriş Yap'
              )}
            </button>

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
              onClick={() => {
                document.cookie = 'travia_staff_session=demo; path=/; max-age=86400';
                router.push(redirect);
              }}
              className="w-full py-2.5 rounded-xl bg-[#111827] border border-[#C9A66B]/20 text-[#C9A66B] text-xs font-medium hover:bg-[#C9A66B]/10 transition-all flex items-center justify-center gap-2"
            >
              Demo Girişi (Hızlı İnceleme)
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-[#F5F1E8]/20 mt-6 tracking-wide">
          © {new Date().getFullYear()} Travia Dubai · Güvenli bağlantı
        </p>
      </div>
    </div>
  );
}

export default function CrmLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#05070F]">
        <div className="w-8 h-8 border-2 border-[#C9A66B]/30 border-t-[#C9A66B] rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

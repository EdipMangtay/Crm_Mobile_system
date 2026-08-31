'use client';

import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import GoldLine from './ui/GoldLine';
import { NAV_LINKS, CONTACT } from '@/lib/constants';

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-navy-900 pt-2" role="contentinfo">
      <GoldLine />

      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-xl font-semibold tracking-wider text-cream">
                TRAVIA
              </span>
              <span className="text-gold-gradient font-serif text-xl font-semibold tracking-wider">
                DUBAI
              </span>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed max-w-xs">
              Dubai&apos;nin ayrıcalıklı dünyasını size özel VIP turlar, profesyonel vize danışmanlığı ve unutulmaz deneyimlerle keşfedin.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-gold-400 font-medium text-sm tracking-wider uppercase mb-4">
              Hızlı Linkler
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-cream/40 text-sm hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-400 font-medium text-sm tracking-wider uppercase mb-4">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="flex items-center gap-2 text-cream/40 text-sm hover:text-gold-400 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 text-cream/40 text-sm hover:text-gold-400 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-cream/40 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                {CONTACT.address}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-gold-400 font-medium text-sm tracking-wider uppercase mb-4">
              Sosyal Medya
            </h3>
            <div className="flex gap-3">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-cream/40 hover:bg-gold-500/10 hover:text-gold-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-cream/40 hover:bg-green-500/10 hover:text-green-400 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <GoldLine className="mt-10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-cream/30 text-xs">
          <p>© {new Date().getFullYear()} Travia Dubai. Tüm hakları saklıdır.</p>
          <p>Dubai, Birleşik Arap Emirlikleri</p>
        </div>
      </div>
    </footer>
  );
}

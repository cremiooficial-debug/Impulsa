import React from 'react';
import AppLogo from '@/components/ui/AppLogo';


const Footer: React.FC = () => {
  const links = [
    { label: 'Programa', href: '#programa' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Precios', href: '#precios' },
    { label: 'Preguntas', href: '#preguntas' },
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
  ];

  const socials = [
    { icon: 'PhotoIcon', label: 'Instagram', href: '#' },
    { icon: 'VideoCameraIcon', label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="border-t border-white/10 py-10 px-6 bg-[#030C16]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo Corporativo Impulsa UCV + Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #144979 0%, #0B2540 100%)',
                border: '1px solid rgba(255, 143, 28, 0.3)',
              }}
            >
              <AppLogo size={22} className="text-[#FF8F1C]" />
            </div>
            <span
              className="text-white font-black text-lg tracking-tight"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Impulsa <span style={{ color: '#FF8F1C' }}>UCV</span>
            </span>
          </div>

          {/* Enlaces: Se ocultan en móviles ('hidden') y se muestran en pantallas medianas o superiores ('md:flex') */}
          <div className="hidden md:flex items-center gap-6">
            <div className="h-4 w-[1px] bg-white/10" />

            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-400 hover:text-[#FF8F1C] text-sm font-semibold transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Lado derecho: Redes sociales y Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-5">

          <span className="text-xs font-medium text-slate-400">
            © 2026 Impulsa UCV. Todos los derechos reservados.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
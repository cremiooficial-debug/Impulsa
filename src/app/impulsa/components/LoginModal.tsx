'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Icon from '@/components/ui/AppIcon';
import LoginLogo from '@/components/ui/LoginLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSuccess(false);
      setIsLoading(false);
      setErrorMsg('');
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Consulta directa y segura a la tabla 'usuarios'
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email.trim())
        .eq('password', password.trim())
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        setIsLoading(false);
        setErrorMsg(`Error DB: ${error.message}`);
        return;
      }

      if (!data) {
        setIsLoading(false);
        setErrorMsg('Correo o contraseña incorrectos.');
        return;
      }

      // 2. Guardar sesión y marcar éxito
      localStorage.setItem('user_session', JSON.stringify(data));
      setIsLoading(false);
      setSuccess(true);

      // 3. Redirigir automáticamente a la app de costos después de 1 segundo
      setTimeout(() => {
        onClose();
        router.push('/distribution');
      }, 1000);

    } catch (err: any) {
      console.error('Error en el login:', err);
      setIsLoading(false);
      setErrorMsg(`Error: ${err?.message || 'Ocurrió un error al conectar con la base de datos.'}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-3xl p-8 border border-white/12 shadow-2xl"
        style={{ background: 'rgba(11, 37, 64, 0.97)' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Icon name="XMarkIcon" size={18} />
        </button>

        {success ? (
          <div className="text-center py-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)' }}
            >
              <Icon name="CheckCircleIcon" size={28} style={{ color: '#030C16' }} />
            </div>
            <h3 id="login-modal-title" className="text-white text-xl font-extrabold mb-2">
              Sesión iniciada
            </h3>
            <p className="text-slate-300 text-sm font-medium mb-6">
              Bienvenido de vuelta a IMPULSA UCV.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push('/distribution');
              }}
              className="w-full py-3 rounded-xl font-black text-sm uppercase tracking-wider text-[#030C16] cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)' }}
            >
              Continuar
            </button>
          </div>
        ) : (
          <>
            {/* Logo y Encabezado del Modal */}
            <div className="flex flex-col items-center mb-6">
              <LoginLogo />
              <h3 id="login-modal-title" className="text-white text-xl font-extrabold mb-1 text-center mt-3">
                Inicia sesión
              </h3>
              <p className="text-slate-400 text-sm font-medium text-center">
                Accede a tu cuenta de IMPULSA UCV.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300"
                >
                  Correo electrónico
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                  placeholder="tu.correo@ucv.ve"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold mb-2 uppercase tracking-wider text-slate-300"
                >
                  Contraseña
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold text-center">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-[#030C16] cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)',
                  boxShadow: '0 8px 30px rgba(255, 143, 28, 0.45)',
                }}
              >
                {isLoading ? 'Verificando...' : 'Iniciar sesión'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import LoginLogo from '@/components/ui/LoginLogo';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectAfterSuccess, setRedirectAfterSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const { signIn, signUp } = useAuth();

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
      setIsSignUp(false);
      setIsLoading(false);
      setSuccessMessage('');
      setRedirectAfterSuccess(false);
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
      const normalizedEmail = email.trim().toLowerCase();
      if (isSignUp) {
        const hasSession = await signUp(normalizedEmail, password);
        setSuccessMessage(
          hasSession
            ? 'Tu cuenta está lista. Ya puedes acceder a IMPULSA UCV.'
            : 'Revisa tu correo y confirma la cuenta para poder iniciar sesión.'
        );
        setRedirectAfterSuccess(hasSession);
      } else {
        await signIn(normalizedEmail, password);
        setSuccessMessage('Bienvenido de vuelta a IMPULSA UCV.');
        setRedirectAfterSuccess(true);
      }
      setSuccess(true);
    } catch (error) {
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al conectar con el servicio de autenticación.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/12 shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: 'rgba(11, 37, 64, 0.97)' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
              {redirectAfterSuccess ? 'Operación completada' : 'Confirma tu correo'}
            </h3>
            <p className="text-slate-300 text-sm font-medium mb-6">
              {successMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (redirectAfterSuccess) router.push('/distribution');
              }}
              className="w-full py-3 rounded-xl font-black text-sm uppercase tracking-wider text-[#030C16] cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)' }}
            >
              {redirectAfterSuccess ? 'Continuar' : 'Cerrar'}
            </button>
          </div>
        ) : (
          <>
            {/* Logo y Encabezado del Modal con tamaño proporcional (aprox 1/3 del ancho del modal) */}
            <div className="flex flex-col items-center mb-5 sm:mb-6">
              <div className="mb-3 flex justify-center">
                <LoginLogo />
              </div>
              <h3 id="login-modal-title" className="text-white text-xl sm:text-2xl font-extrabold mb-1 text-center">
                {isSignUp ? 'Crea tu cuenta' : 'Inicia sesión'}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-medium text-center">
                {isSignUp ? 'Regístrate para acceder a IMPULSA UCV.' : 'Accede a tu cuenta de IMPULSA UCV.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold mb-1.5 sm:mb-2 uppercase tracking-wider text-slate-300"
                >
                  Correo electrónico
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
                  placeholder="tu.correo@ucv.ve"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold mb-1.5 sm:mb-2 uppercase tracking-wider text-slate-300"
                >
                  Contraseña
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder-slate-400 focus:outline-none focus:border-[#FF8F1C] transition-colors"
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
                className="w-full py-3 sm:py-3.5 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-[#030C16] cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FF8F1C 0%, #FF7300 100%)',
                  boxShadow: '0 8px 30px rgba(255, 143, 28, 0.45)',
                }}
              >
                {isLoading
                  ? 'Procesando...'
                  : isSignUp
                    ? 'Crear cuenta'
                    : 'Iniciar sesión'}
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                setIsSignUp((value) => !value);
                setErrorMsg('');
              }}
              className="mt-4 w-full text-center text-xs font-bold text-slate-300 hover:text-[#FF8F1C] transition-colors"
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Crear una'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { validateEmailDomain, getEmailDomainError, hashPassword, setCurrentUser } from '../lib/auth';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
}

export function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = name.trim() !== '' && email.trim() !== '' && password.trim() !== '' && validateEmailDomain(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setGeneralError('');

    if (!validateEmailDomain(email)) {
      setEmailError(getEmailDomainError());
      return;
    }

    setIsLoading(true);

    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (existingUser) {
        setGeneralError('An account with this email already exists.');
        setIsLoading(false);
        return;
      }

      const passwordHash = await hashPassword(password);

      const { data: newUser, error } = await supabase
        .from('users')
        .insert([
          {
            email: email.toLowerCase(),
            name: name.trim(),
            password_hash: passwordHash,
          },
        ])
        .select('id, email, name')
        .single();

      if (error) {
        setGeneralError('Failed to create account. Please try again.');
        setIsLoading(false);
        return;
      }

      setCurrentUser({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      });

      onNavigate('dashboard');
    } catch (error) {
      setGeneralError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F7] flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-[800] text-[#1A1A1A] mb-12 tracking-tight" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
        Sign Up
      </h1>

      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-10">
        {generalError && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
            <p className="text-sm font-[500] text-[#FF3B3B]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              {generalError}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-[500] text-[#1A1A1A]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors duration-200 text-[#1A1A1A] placeholder-[#6D6D6D]"
              style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-[500] text-[#1A1A1A]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="you@demandvibes.com"
              className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors duration-200 text-[#1A1A1A] placeholder-[#6D6D6D]"
              style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
              required
            />
            {emailError && (
              <p className="text-[14px] text-[#FF3B3B] mt-[6px]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
                {emailError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-[500] text-[#1A1A1A]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors duration-200 text-[#1A1A1A] placeholder-[#6D6D6D]"
              style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full bg-[#004CFF] text-white font-[600] text-base px-9 py-4 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 mt-2 ${
              !isFormValid || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#0040CC] hover:shadow-[0_12px_32px_rgba(0,76,255,0.2)]'
            }`}
            style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
          <span className="text-[#6D6D6D] font-[400]">Already have an account? </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-[#004CFF] font-[500] hover:underline transition-colors duration-200"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

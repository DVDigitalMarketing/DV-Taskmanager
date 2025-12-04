import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ResetPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ResetPasswordPage({ onNavigate }: ResetPasswordPageProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Invalid or expired reset link. Please request a new one.');
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!newPassword || !confirmPassword) {
      setError('Both fields are required.');
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
        return;
      }

      setSuccess('Password updated successfully!');
      setTimeout(() => {
        onNavigate('dashboard');
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F7] flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-[800] text-[#1A1A1A] mb-12 tracking-tight" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
        Create New Password
      </h1>

      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] p-10">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
            <p className="text-sm font-[500] text-[#FF3B3B]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
            <p className="text-sm font-[500] text-green-700" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              {success}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-sm font-[500] text-[#1A1A1A]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors duration-200 text-[#1A1A1A] placeholder-[#6D6D6D]"
              style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
              required
            />
            <p className="text-xs text-[#6D6D6D] mt-1">Minimum 6 characters</p>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-[500] text-[#1A1A1A]" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="px-4 py-3 rounded-2xl border-2 border-[#D0D4DC] focus:outline-none focus:border-[#004CFF] transition-colors duration-200 text-[#1A1A1A] placeholder-[#6D6D6D]"
              style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !!success}
            className={`w-full bg-[#004CFF] text-white font-[600] text-base px-9 py-4 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 mt-2 ${
              isLoading || success
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#0040CC] hover:shadow-[0_12px_32px_rgba(0,76,255,0.2)]'
            }`}
            style={{ fontFamily: 'Inter, Roboto, sans-serif' }}
          >
            {isLoading ? 'Updating Password...' : success ? 'Redirecting...' : 'Update Password'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm" style={{ fontFamily: 'Inter, Roboto, sans-serif' }}>
          <button
            onClick={() => onNavigate('login')}
            className="text-[#004CFF] font-[500] hover:underline transition-colors duration-200"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

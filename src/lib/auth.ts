export const VALID_EMAIL_DOMAIN = '@demandvibes.com';

export const validateEmailDomain = (email: string): boolean => {
  return email.toLowerCase().endsWith(VALID_EMAIL_DOMAIN);
};

export const getEmailDomainError = (): string => {
  return 'This email is not eligible. Use your DemandVibes work email.';
};

export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export interface User {
  id: string;
  email: string;
  name: string;
}

export const setCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

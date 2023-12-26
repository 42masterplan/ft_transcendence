'use client';

const getAuthorization = (): string | null => {
  const cookies: {[key: string]: string} = {};
  if (typeof document === 'undefined') return null;
  else {
    document?.cookie?.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookies[name] = value;
    });
    const token = cookies.accessToken || null;
    return token;
  }
};

export default getAuthorization;

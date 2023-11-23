const getAuthorization = (): string | null => {
  const cookies: {[key: string]: string} = {};

  document.cookie.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = value;
  });
  const token = cookies.Authorization || null;

  return token;
};

export default getAuthorization;

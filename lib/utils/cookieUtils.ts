const getAuthorization = (): string | null => {
  const cookies: {[key: string]: string} = {};
  console.log('쿠키:', document.cookie);
  document.cookie.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = value;
  });
  console.log('쿠키22:', cookies);

  // const token = cookies.accessToken || null;
  // console.log('토큰22222:', token);
  return 'AccessToken';
};

export default getAuthorization;

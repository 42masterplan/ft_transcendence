import {useSession, signIn, signOut} from 'next-auth/react';

export default function CamperVanPage() {
  const {data: session, status} = useSession();
  const userEmail = session?.user?.email;

  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }

  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <br />
        <button onClick={() => signOut()}>Sign out</button>
        <img src='https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png' />
      </>
    );
  }

  return (
    <>
      <div>Not signed in.</div>
      <br />
      <button onClick={() => signIn('github')}>Sign in</button>
    </>
  );
}

import NavBar from './NavBar';
import React from 'react';
export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div>{children}</div>
      <NavBar />
    </>
  );
}

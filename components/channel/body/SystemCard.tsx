import React from 'react';

export default React.forwardRef(function SystemCard(
  {children}: {children: React.ReactNode},
  ref: any
) {
  return (
    <div className='flex w-full text-xl justify-center' ref={ref}>
      {children}
    </div>
  );
});

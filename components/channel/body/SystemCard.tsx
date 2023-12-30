import React from 'react';

export default React.forwardRef(function SystemCard(
  {children}: {children: React.ReactNode},
  ref: any
) {
  return (
    <div className='flex w-full text-l justify-center text-gray-400' ref={ref}>
      {children}
    </div>
  );
});

import React from 'react';
import {motion} from 'framer-motion';

type CrescentLoaderProps = {
  size?: number; // diameter of the loader in pixels
  color?: string;
};

export default function CrescentLoader({
  size = 4,
  color = 'custom1'
}: CrescentLoaderProps) {
  size *= 20;
  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`
  };
  const borderThickness = size < 100 ? 4 : 8;

  return (
    <div className='flex justify-center items-center h-fit'>
      <div className='' style={loaderStyle}>
        <motion.span
          className={`block w-full h-full border-t-${borderThickness} border-${color} rounded-full`}
          animate={{rotate: 360}}
          transition={{repeat: Infinity, duration: 1, ease: 'linear'}}
        />
      </div>
    </div>
  );
}

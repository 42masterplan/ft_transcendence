import React from 'react';
import {motion} from 'framer-motion';

type FadingDotsLoaderProps = {
  size?: number; // size of each dot in pixels
  color?: string;
};

export default function FadingDotsLoader({
  size = 10,
  color = 'custom2'
}: FadingDotsLoaderProps) {
  size *= 4;
  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`
  };

  const variants = {
    animate: {
      scale: [1, 2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {repeat: Infinity, duration: 1.5, ease: 'easeInOut'}
    }
  };

  return (
    <div
      className='flex justify-center items-center h-fit space-x-2'
      style={{gap: `${size / 10}px`}}
    >
      {[...Array(3)].map((_, index) => (
        <motion.span
          key={index}
          className={`block rounded-full bg-${color}`}
          style={dotStyle}
          variants={variants}
          animate='animate'
          initial={{opacity: 0.7}}
          transition={{delay: index * 0.5}}
        />
      ))}
    </div>
  );
}

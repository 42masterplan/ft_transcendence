import React from 'react';
import {motion} from 'framer-motion';

type SpinningLoader2Props = {
  size?: number; // diameter of the loader in pixels
  color?: string;
};

export default function SpinningLoader2({
  size = 1,
  color = 'custom4'
}: SpinningLoader2Props) {
  size *= 20;
  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`
  };

  return (
    <div className='flex w-fit h-fit justify-center items-center'>
      <motion.div
        className='relative'
        style={loaderStyle}
        animate={{rotate: 360}}
        transition={{repeat: Infinity, duration: 1.2, ease: 'linear'}}
      >
        {Array.from({length: 8}).map((_, index) => (
          <span
            key={index}
            className={`absolute bg-${color} rounded-full`}
            style={{
              top: '50%',
              left: '50%',
              margin: '-3px 0 0 -1px',
              transform: `rotate(${index * 45}deg) translateY(-${size / 2}px)`,
              width: `${size / 10}px`,
              height: `${size / 4}px`
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

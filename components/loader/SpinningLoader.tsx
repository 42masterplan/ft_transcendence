import {motion} from 'framer-motion';

export default function SpinningLoader() {
  return (
    <div className='absolute inset-0 flex items-center justify-center'>
      <motion.div
        className='w-32 h-32 sm:w-52 sm:h-52 bg-custom3' // Tailwind classes for width, height, background
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['20%', '20%', '50%', '50%', '20%']
        }}
        transition={{
          duration: 2,
          ease: 'easeIn',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
      {/* Loading text animation */}
      <motion.p
        className='absolute text-3xl sm:text-5xl font-bold text-center text-custom4'
        animate={{
          opacity: [0, 1, 1, 0, 0],
          scale: [1, 1, 1.2, 1.2, 1],
          rotate: [0, 0, 270, 270, 0]
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      >
        Loading
      </motion.p>
    </div>
  );
}

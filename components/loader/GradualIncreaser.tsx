// Gradually increases the number from start value to end value

import {useState} from 'react';

/**
 * Gradually increases the number from start value to end value
 *
 * @param start: number (integer)
 * @param end: number (integer)
 * @param useDecimals: boolean (default: false)
 * @param duration: number (default: 500, unit: ms)
 * @param className: string (default: '')
 */

interface GradualIncreaserProps {
  start: number;
  end: number;
  useDecimals?: boolean;
  duration?: number;
  className?: string;
}

export default function GradualIncreaser({
  start,
  end,
  useDecimals = false,
  duration = 500,
  className = ''
}: GradualIncreaserProps) {
  // get increment value
  const increment = (end - start) / (duration / 10);
  const [value, setValue] = useState(start);

  // increase value
  if (value < end) {
    setTimeout(() => {
      setValue(value + increment);
    }, 10);
  }

  return (
    <span className={`${className}`}>{value.toFixed(useDecimals ? 2 : 0)}</span>
  );
}

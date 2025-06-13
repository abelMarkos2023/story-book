'use client';

import { useEffect, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
}

export default function CountUp({ end, duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = 30;
    const totalIncrements = duration / incrementTime;
    const increment = end / totalIncrements;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
}

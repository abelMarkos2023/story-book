import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function stringToHslColor(str: string, saturation: number, lightness: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, ${saturation}%, ${lightness}%)`;
}


export function timeAgo(dateString: string): string {
  // Validate input
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date string:', dateString);
    return 'Invalid date';
  }

  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds

  // Define intervals for time units
  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'], // seconds
    [60, 'minute'], // minutes
    [24, 'hour'],   // hours
    [7, 'day'],     // days
    [4.34524, 'week'], // weeks (~30.42 days/month)
    [12, 'month'],  // months
    [Number.POSITIVE_INFINITY, 'year'], // years
  ];

  let duration = diff;
  let unit: Intl.RelativeTimeFormatUnit = 'second';

  // Find appropriate time unit
  for (const [threshold, timeUnit] of intervals) {
    if (duration < threshold) {
      unit = timeUnit;
      break;
    }
    duration /= threshold;
  }

  // Use Math.round for more natural output (e.g., 59.9s -> 1min)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  return rtf.format(-Math.round(duration), unit);
}

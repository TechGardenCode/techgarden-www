import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function seed(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

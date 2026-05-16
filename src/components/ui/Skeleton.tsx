import React from 'react';
import { cn } from '../../utils/cn';

export default function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-emerald-100/50', className)}
      {...props}
    />
  );
}

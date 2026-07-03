import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  fetchPriority?: "high" | "low" | "auto";
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: "lazy" | "eager";
}

export function Image({ src, alt, className, wrapperClassName, ...props }: ImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-coffee-100", wrapperClassName)}>
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        {...props}
      />
    </div>
  );
}

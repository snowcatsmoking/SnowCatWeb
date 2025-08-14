"use client"

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Loading } from './Loading'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: React.ReactNode
  showLoading?: boolean
  loadingClassName?: string
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallback,
  showLoading = true,
  loadingClassName,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  if (error) {
    if (fallback) {
      return <div className={className}>{fallback}</div>
    }
    
    return (
      <div className={cn(
        'flex items-center justify-center bg-muted rounded',
        className
      )}>
        <span className="text-xs text-muted-foreground">图片加载失败</span>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      {isLoading && showLoading && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-muted rounded',
          loadingClassName
        )}>
          <Loading size="sm" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        priority={props.priority}
        quality={85}
        {...props}
      />
    </div>
  )
}

// Avatar component with optimization
export function Avatar({
  src,
  alt,
  size = 48,
  fallback,
  className,
}: {
  src?: string
  alt: string
  size?: number
  fallback?: string
  className?: string
}) {
  if (!src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium',
          className
        )}
        style={{ width: size, height: size, fontSize: size / 3 }}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full object-cover', className)}
      fallback={
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium',
            className
          )}
          style={{ width: size, height: size, fontSize: size / 3 }}
        >
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      }
    />
  )
}
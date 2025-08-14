"use client"

import Image, { type ImageProps } from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { RESPONSIVE_SIZES, preloadImage } from '@/lib/imageOptimization'
import { Loading } from './Loading'

interface ResponsiveImageProps extends Omit<ImageProps, 'sizes'> {
  sizes?: keyof typeof RESPONSIVE_SIZES | string
  fallback?: React.ReactNode
  showLoading?: boolean
  preload?: boolean
  progressive?: boolean
  blurDataURL?: string
}

export function ResponsiveImage({
  src,
  alt,
  className,
  sizes = 'card',
  fallback,
  showLoading = true,
  preload = false,
  progressive = true,
  blurDataURL,
  ...props
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Determine sizes string
  const sizeString = typeof sizes === 'string' && sizes in RESPONSIVE_SIZES 
    ? RESPONSIVE_SIZES[sizes as keyof typeof RESPONSIVE_SIZES]
    : sizes

  // Preload critical images
  useEffect(() => {
    if (preload && typeof src === 'string') {
      preloadImage(src, { 
        priority: true, 
        sizes: sizeString,
        quality: 85 
      })
    }
  }, [preload, src, sizeString])

  if (error) {
    if (fallback) {
      return <div className={className}>{fallback}</div>
    }
    
    return (
      <div className={cn(
        'flex items-center justify-center bg-muted rounded text-muted-foreground text-sm',
        className
      )}>
        图片加载失败
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading placeholder */}
      {isLoading && showLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <Loading size="sm" />
        </div>
      )}
      
      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        sizes={sizeString}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        placeholder={progressive && blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        quality={85}
        loading={preload ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        {...props}
      />
    </div>
  )
}

// Hero image component with optimized loading
export function HeroImage({
  src,
  alt,
  className,
  overlay = true,
  children,
  ...props
}: Omit<ResponsiveImageProps, 'sizes'> & {
  overlay?: boolean
  children?: React.ReactNode
}) {
  return (
    <div className={cn('relative w-full h-full', className)}>
      <ResponsiveImage
        src={src}
        alt={alt}
        sizes="hero"
        fill
        preload
        priority
        className="object-cover"
        {...props}
      />
      
      {/* Gradient overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      )}
      
      {/* Content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {children}
        </div>
      )}
    </div>
  )
}

// Optimized avatar component
export function OptimizedAvatar({
  src,
  alt,
  size = 96,
  fallback,
  className,
  ...props
}: {
  src?: string
  alt: string
  size?: number
  fallback?: string
  className?: string
} & Omit<ResponsiveImageProps, 'width' | 'height' | 'sizes'>) {
  if (!src) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground font-semibold border-2 border-border',
          className
        )}
        style={{ width: size, height: size, fontSize: size / 3 }}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className={cn('relative rounded-full overflow-hidden border-2 border-border', className)}>
      <ResponsiveImage
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes="avatar"
        className="object-cover"
        fallback={
          <div
            className="flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 text-foreground font-semibold"
            style={{ width: size, height: size, fontSize: size / 3 }}
          >
            {fallback || alt.charAt(0).toUpperCase()}
          </div>
        }
        {...props}
      />
    </div>
  )
}
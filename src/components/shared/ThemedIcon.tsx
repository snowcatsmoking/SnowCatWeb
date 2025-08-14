"use client"

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { ANIMATION_DURATION } from '@/lib/constants'

interface ThemedIconProps {
  iconName: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallback?: React.ReactNode
}

export function ThemedIcon({ 
  iconName, 
  alt, 
  width = 32, 
  height = 32, 
  className, 
  fallback 
}: ThemedIconProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (resolvedTheme || theme) : 'light'
  
  if (imageError && fallback) {
    return <div className={className}>{fallback}</div>
  }

  if (imageError) {
    return (
      <div className={cn(
        'flex items-center justify-center rounded border bg-muted',
        className
      )} style={{ width, height }}>
        <span className="text-xs text-muted-foreground">图标</span>
      </div>
    )
  }
  
  return (
    <div className={cn(
      'relative transition-all',
      !imageLoaded && 'animate-pulse bg-muted rounded',
      className
    )} style={{ transitionDuration: `${ANIMATION_DURATION.normal}ms` }}>
      <Image
        src={`/images/icon/${iconName}.svg`}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'object-contain transition-opacity',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          filter: currentTheme === 'dark' 
            ? 'invert(1) brightness(1.2) contrast(1.1)' 
            : 'invert(0) brightness(0.8) contrast(1.1)',
          transitionDuration: `${ANIMATION_DURATION.normal}ms`
        }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  )
}
// Image optimization utilities

export interface ImagePreloadOptions {
  priority?: boolean
  sizes?: string
  quality?: number
}

// Preload critical images
export function preloadImage(src: string, options: ImagePreloadOptions = {}) {
  if (typeof window === 'undefined') return

  const { priority = false, sizes, quality = 85 } = options
  
  const link = document.createElement('link')
  link.rel = priority ? 'preload' : 'prefetch'
  link.as = 'image'
  link.href = src
  
  if (sizes) {
    link.setAttribute('imagesizes', sizes)
  }
  
  // Add quality parameter for Next.js optimized images
  if (src.includes('/_next/')) {
    const url = new URL(src, window.location.origin)
    url.searchParams.set('q', quality.toString())
    link.href = url.toString()
  }
  
  document.head.appendChild(link)
}

// Preload multiple images
export function preloadImages(sources: Array<string | { src: string; options?: ImagePreloadOptions }>) {
  sources.forEach(source => {
    if (typeof source === 'string') {
      preloadImage(source)
    } else {
      preloadImage(source.src, source.options)
    }
  })
}

// Generate responsive image sizes
export function generateImageSizes(breakpoints: Record<string, number>) {
  return Object.entries(breakpoints)
    .map(([breakpoint, width]) => `(max-width: ${width}px) ${Math.floor(width * 0.9)}px`)
    .join(', ') + ', 100vw'
}

// Common responsive sizes for different use cases
export const RESPONSIVE_SIZES = {
  hero: '100vw',
  card: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  avatar: '(max-width: 768px) 64px, 96px',
  thumbnail: '(max-width: 768px) 150px, 200px',
  icon: '32px',
} as const

// Image format detection and optimization
export function getOptimalImageFormat(userAgent?: string): 'webp' | 'avif' | 'jpeg' {
  if (typeof window === 'undefined') return 'webp'
  
  const ua = userAgent || navigator.userAgent
  
  // Check for AVIF support (most modern browsers)
  if (window.navigator.userAgent.includes('Chrome/') && 
      parseInt(window.navigator.userAgent.split('Chrome/')[1]) >= 85) {
    return 'avif'
  }
  
  // Check for WebP support
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const ctx = canvas.getContext('2d')
  if (ctx && canvas.toDataURL('image/webp').startsWith('data:image/webp')) {
    return 'webp'
  }
  
  return 'jpeg'
}

// Lazy load images with intersection observer
export class LazyImageLoader {
  private observer: IntersectionObserver | null = null
  private images: Set<HTMLImageElement> = new Set()

  constructor(options: IntersectionObserverInit = {}) {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
        rootMargin: '100px',
        threshold: 0.1,
        ...options,
      })
    }
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        this.loadImage(img)
      }
    })
  }

  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src
    const srcset = img.dataset.srcset
    
    if (src) {
      img.src = src
    }
    
    if (srcset) {
      img.srcset = srcset
    }
    
    img.classList.remove('lazy')
    img.classList.add('loaded')
    
    this.observer?.unobserve(img)
    this.images.delete(img)
  }

  observe(img: HTMLImageElement) {
    if (this.observer && img.dataset.src) {
      this.images.add(img)
      this.observer.observe(img)
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
      this.images.clear()
    }
  }
}

// Create a global lazy loader instance
export const globalLazyLoader = typeof window !== 'undefined' ? new LazyImageLoader() : null

// Image compression utility for client-side
export function compressImage(file: File, quality: number = 0.8, maxWidth: number = 1920): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to compress image'))
        }
      }, 'image/jpeg', quality)
    }
    
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}
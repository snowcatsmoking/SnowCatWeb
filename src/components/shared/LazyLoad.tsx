"use client"

import { lazy, Suspense, type ComponentType } from 'react'
import { Loading, CardSkeleton } from './Loading'
import { ErrorBoundary } from './ErrorBoundary'

interface LazyLoadProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  error?: React.ReactNode
}

// Generic lazy loading wrapper
export function LazyLoad({ children, fallback, error }: LazyLoadProps) {
  return (
    <ErrorBoundary fallback={error}>
      <Suspense fallback={fallback || <Loading />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

// HOC for lazy loading components
export function withLazyLoad<P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc)
  
  return function LazyLoadedComponent(props: P) {
    return (
      <LazyLoad fallback={fallback}>
        <LazyComponent {...(props as any)} />
      </LazyLoad>
    )
  }
}

// Intersection Observer based lazy loading
export function IntersectionLazyLoad({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '100px',
  triggerOnce = true,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}) {
  const { useIntersectionObserver } = require('@/hooks/useIntersectionObserver')
  
  const { isIntersecting, targetRef } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  })

  return (
    <div ref={targetRef}>
      {isIntersecting ? children : (fallback || <CardSkeleton />)}
    </div>
  )
}
"use client"

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  triggerOnce?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  root = null,
  triggerOnce = true,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const targetRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    // If it has already triggered and triggerOnce is true, don't create observer
    if (hasTriggered && triggerOnce) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting
        setIsIntersecting(isCurrentlyIntersecting)

        if (isCurrentlyIntersecting && triggerOnce) {
          setHasTriggered(true)
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
      observer.disconnect()
    }
  }, [threshold, rootMargin, root, triggerOnce, hasTriggered])

  return { isIntersecting: isIntersecting || hasTriggered, targetRef }
}

// Hook for lazy loading images
export function useLazyImage(src: string) {
  const [imageSrc, setImageSrc] = useState<string>()
  const [isLoaded, setIsLoaded] = useState(false)
  const { isIntersecting, targetRef } = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (isIntersecting && !imageSrc) {
      setImageSrc(src)
    }
  }, [isIntersecting, src, imageSrc])

  useEffect(() => {
    if (imageSrc) {
      const img = new Image()
      img.onload = () => setIsLoaded(true)
      img.src = imageSrc
    }
  }, [imageSrc])

  return { imageSrc, isLoaded, targetRef }
}
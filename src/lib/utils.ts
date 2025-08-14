import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// URL utilities
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function addUtmParams(url: string, utmSource: string): string {
  if (!url) return ''
  
  const fullUrl = url.includes('http') ? url : `https://${url}`
  
  try {
    const urlObj = new URL(fullUrl)
    urlObj.searchParams.set('utm_source', utmSource)
    return urlObj.toString()
  } catch {
    return fullUrl
  }
}

// String utilities
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Array utilities
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Format date utility
export function formatDateString(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

// Theme utilities
export function getThemeColor(theme: 'light' | 'dark' | undefined): {
  background: string
  foreground: string
} {
  return {
    background: theme === 'dark' ? '#000000' : '#ffffff',
    foreground: theme === 'dark' ? '#ffffff' : '#000000',
  }
}

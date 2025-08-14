import { cn } from '@/lib/utils'
import { ANIMATION_DURATION } from '@/lib/constants'

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gradient' | 'glass' | 'outline'
  hover?: 'lift' | 'glow' | 'scale' | 'none'
  clickable?: boolean
  onClick?: () => void
}

const cardVariants = {
  default: 'bg-card border border-border shadow-sm',
  gradient: 'bg-gradient-to-br from-card via-card/95 to-muted/20 border border-border/50 shadow-md',
  glass: 'bg-background/60 backdrop-blur-md border border-border/30 shadow-lg',
  outline: 'bg-transparent border-2 border-border/50 shadow-none hover:border-border',
}

const hoverVariants = {
  lift: 'hover:-translate-y-1 hover:shadow-lg',
  glow: 'hover:shadow-xl hover:shadow-primary/10',
  scale: 'hover:scale-[1.02]',
  none: '',
}

export function EnhancedCard({
  children,
  className,
  variant = 'default',
  hover = 'lift',
  clickable = false,
  onClick,
}: EnhancedCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg p-6 transition-all',
        cardVariants[variant],
        hoverVariants[hover],
        clickable && 'cursor-pointer select-none active:scale-[0.98]',
        className
      )}
      style={{ transitionDuration: `${ANIMATION_DURATION.normal}ms` }}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

// Animated gradient background
export function GradientCard({
  children,
  className,
  colors = ['from-blue-500/10', 'via-purple-500/10', 'to-pink-500/10'],
}: {
  children: React.ReactNode
  className?: string
  colors?: string[]
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      {/* Animated background gradient */}
      <div 
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-50 animate-pulse',
          ...colors
        )}
      />
      
      {/* Content */}
      <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg p-6">
        {children}
      </div>
    </div>
  )
}

// Interactive card with ripple effect
export function RippleCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Create ripple effect
    const card = e.currentTarget
    const ripple = document.createElement('div')
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: currentColor;
      border-radius: 50%;
      opacity: 0.3;
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
    `

    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style')
      style.id = 'ripple-styles'
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    card.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
    
    onClick?.()
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-card border border-border p-6 cursor-pointer select-none transition-all hover:shadow-lg active:scale-[0.98]',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
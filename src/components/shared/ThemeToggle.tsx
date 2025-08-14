"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ANIMATION_DURATION } from "@/lib/constants"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setIsToggling(true)
    // 直接在light和dark之间切换，跳过system
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
    // Reset animation state
    setTimeout(() => setIsToggling(false), ANIMATION_DURATION.normal)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative">
        <div className="h-[1.2rem] w-[1.2rem] rounded-full bg-muted animate-pulse" />
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className={cn(
        "relative group overflow-hidden hover:bg-accent/50",
        isToggling && "animate-pulse"
      )}
      title={resolvedTheme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
    >
      {/* Background circle animation */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Sun icon */}
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all duration-300",
        "text-yellow-500 dark:text-yellow-400",
        resolvedTheme === 'dark' 
          ? "-rotate-90 scale-0 opacity-0" 
          : "rotate-0 scale-100 opacity-100"
      )} />
      
      {/* Moon icon */}
      <Moon className={cn(
        "absolute h-[1.2rem] w-[1.2rem] transition-all duration-300",
        "text-blue-400 dark:text-blue-300",
        resolvedTheme === 'dark'
          ? "rotate-0 scale-100 opacity-100"
          : "rotate-90 scale-0 opacity-0"
      )} />
      
      <span className="sr-only">切换主题</span>
    </Button>
  )
}

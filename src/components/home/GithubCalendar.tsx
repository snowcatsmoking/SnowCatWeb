'use client'

import { memo, useMemo } from 'react'
import { useTheme } from 'next-themes'
import GitHubCalendar from 'react-github-calendar'
import { githubUsername } from '@/config/infoConfig'

const GithubContributions = memo(function GithubContributions() {
  const { resolvedTheme } = useTheme()
  
  const calendarProps = useMemo(() => ({
    username: githubUsername,
    fontSize: 12,
    blockSize: 12,
    blockMargin: 5,
    blockRadius: 4,
    colorScheme: resolvedTheme === 'dark' ? 'dark' as const : 'light' as const,
  }), [resolvedTheme])

  return (
    <div className="w-full overflow-hidden">
      <GitHubCalendar {...calendarProps} />
    </div>
  )
})

export default GithubContributions
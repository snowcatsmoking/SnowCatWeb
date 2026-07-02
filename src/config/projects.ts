// Types
export type ProjectItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
  icon: string
}

export type ActivityItemType = {
  name: string
  description: string
  date: string
  location: string
  link?: string
  icon?: string
}

// Awards
export const awardsHeadLine = "Awards & Honors"
export const awardsIntro = "The moon waxes only to wane; water fills only to overflow."
export const awards: Array<ActivityItemType> = [
  {
    name: 'Chinese Mathematics Competition',
    description: 'First Prize, Beijing',
    date: '2025',
    location: 'Beijing, Haidian',
  },
  {
    name: 'Challenge Cup Innovation & Entrepreneurship Competition',
    description: 'Third Prize, Beijing',
    date: '2025',
    location: 'Beijing, Haidian',
  },
  {
    name: 'National College Engineering Robot Competition',
    description: 'National Excellence Award',
    date: '2025',
    location: 'Beijing, Haidian',
  },
  {
    name: 'College Engineering Innovation Competition',
    description: 'First Prize, Beijing — Intelligent Rescue Track',
    date: '2025',
    location: 'Beijing, Haidian',
  },
  {
    name: 'BUPT Third-Class Scholarship',
    description: '',
    date: '2024',
    location: 'Beijing, Haidian',
  },
  {
    name: 'National College Network & IT Competition',
    description: 'Third Prize, National — Track 3',
    date: '2024',
    location: 'Beijing, Haidian',
  },
]

// Projects
export const projectHeadLine = "Projects"
export const projectIntro = "Side projects and engineering work. Most of them are things I built to scratch my own itch."

export const projects: Array<ProjectItemType> = [
  {
    name: 'One-Eval',
    description: 'An agentic system for automated and traceable LLM evaluation, built on top of DataFlow.',
    link: { href: 'https://github.com/OpenDCAI/One-Eval', label: 'One-Eval' },
    tags: ['DCAI', 'Benchmark'],
    icon: 'github'
  },
  {
    name: 'LoopLM',
    description: 'LoopLM: A Self-Iterative Reasoning Framework for Large Language Models',
    link: { href: 'https://huggingface.co/datasets/miletcxl/looplm', label: 'LoopLM' },
    tags: ['On Working Yet'],
    icon: 'openai'
  },
]

// Hobbies & Volunteer
export const activitiesHeadLine = "Hobbies & Contributions"
export const activitiesIntro = "Some side projects I built for fun. Most of them are small tools that scratch my own itch."
export const activities: Array<ActivityItemType> = [
  {
    name: 'Friberg',
    description:
      'An entropy-based script that solves the CS2 Friberg Game in the minimum number of guesses.',
    date: '2026-07',
    location: 'Beijing',
    link:'https://github.com/snowcatsmoking/forsaken',
    icon: 'counterstrike'
  },
]

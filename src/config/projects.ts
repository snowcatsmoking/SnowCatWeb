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

// Research & Projects
export const projectHeadLine = "Reasearch & Projects"
export const projectIntro = "Sincere thanks to all my coauthors for their great work and support. Hope we can make more great things together."

export const projects: Array<ProjectItemType> = [
  {
    name: 'ACL2026',
    description: 'Streaming Hallucination Detection in Long Chain-of-Thought Reasoning',
    link: { href: 'https://arxiv.org/abs/2601.02170v1', label: 'ACL' },
    tags: ['Reasoning Model', 'LLM Safety'],
    icon: 'arxiv'
  },
  {
    name: 'ACL Industry Track 2026',
    description: 'One-Eval: An Agentic System for Automated and Traceable LLM Evaluation',
    link: { href: 'https://github.com/OpenDCAI/One-Eval', label: 'ACL_Industry' },
    tags: ['DCAI', 'Benchmark'],
    icon: 'arxiv'
  },
  {
    name: 'CVPR2026',
    description: 'Reallocating Attention Across Layers to Reduce Multimodal Hallucination',
    link: { href: 'https://arxiv.org/abs/2510.10285', label: 'CVPR' },
    tags: ['MLLM', 'Inner Safety'],
    icon: 'arxiv'
  },
    {
    name: 'ICASSP2026',
    description: 'Corrector: an execute-to-correct paradigm for efficient llm secure inference',
    link: { href: '#', label: '文章尚未公开' },
    tags: ['LLM','Security'],
    icon: 'arxiv'
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
    name: 'One-Eval',
    description:
      'A subtree of DataFlow, focusing on automated evaluation of LLMs.',
    date: '2026-01',
    location: 'Beijing',
    link:'https://github.com/OpenDCAI/One-Eval',
    icon: 'openai'
  },
  {
    name: 'Friberg',
    description:
      'An entropy-based script that solves the CS2 Friberg Game in the minimum number of guesses.',
    date: '2025-07',
    location: 'Beijing',
    link:'https://github.com/snowcatsmoking/forsaken',
    icon: 'counterstrike'
  },
]

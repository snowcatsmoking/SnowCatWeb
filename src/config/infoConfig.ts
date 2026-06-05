export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = 'SnowCat'
export const headline = 'Minghui Pan(潘明辉)'
export const introduction = `Undergraduate at Beijing University of Posts and Telecommunications, 
majoring in Telecommunications Engineering.
My research focuses on LLM safety and interpretability, 
with recent work on agent safety and reinforcement learning.
Beyond research, I care about building things that actually work — 
contributing to open-source projects and chasing ideas that are 
too weird for a paper but too interesting to ignore. 
I came to research through Innovation competitions, 
and that instinct to ship has never really left.`
export const email = 'panmingh@outlook.com'
export const githubUsername = 'snowcatsmoking'


// about page (kept for compatibility, no longer rendered separately)
export const aboutMeHeadline = 'About Me'
export const aboutParagraphs = [
  "Hello, I'd like you to call me SnowCat.",
  'I am now an undergraduate student at Beijing University of Posts and Telecommunications, majoring in Telecommunications Engineering and Management. I first got involved in AI during my sophomore year, starting with some simple AI application projects.',
  'From my junior year onward, I began focusing on research projects, with a primary interest in large model safety and alignment. I am deeply interested in this field and have already produced several publications and preprints.',
  'In my spare time, I enjoy working on interesting side projects, although my free time has been steadily decreasing. Most of my recent outputs are reflected in my publications.',
]

// blog
export const blogHeadLine = "What am I doing recently?"
export const blogIntro = `I write about AI safety, alignment, and things I find interesting along the way.`

// social links
export type SocialLinkType = {
  name: string
  ariaLabel?: string
  icon: string
  href: string
}

export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'GitHub',
    ariaLabel: 'GitHub Profile',
    icon: 'github',
    href: 'https://github.com/snowcatsmoking',
  },
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/1295215102',
  },
  {
    name: 'HuggingFace',
    ariaLabel: 'HuggingFace Profile',
    icon: 'huggingface',
    href: 'https://huggingface.co/Panminghui',
  },
  {
    name: 'OpenReview',
    ariaLabel: 'OpenReview Profile',
    icon: 'openreview',
    href: 'https://scholar.google.com/citations?user=kcL_NPMAAAAJ&hl=zh-CN',
  },
]

export const wechat = 'pmh13701459590'

// https://simpleicons.org/
export const techIcons = [
  'pytorch',
  'python',
  'overleaf',
  'intellijidea',
  'git',
  'github',
  'react',
  'linux',
  'huggingface',
  'langgraph',
  'arxiv',
  'raspberrypi',
  'nvidia',
  'notion',
  'claude',
]

// site config
export const utm_source = 'SnowCat-Portfolio'

// navigation config
type NavItemType = {
  name: string
  href: string
}

export const footerItems: Array<NavItemType> = [
  { name: 'Home', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blogs', href: '/blogs' },
]

export const navItems: Array<NavItemType> = [
  { name: 'Home', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blogs', href: '/blogs' },
]

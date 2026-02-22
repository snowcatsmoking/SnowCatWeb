export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = 'SnowCat'
export const headline = 'Hello, My name is Panmingh'
export const introduction = `
I go by many names on the internet. If you come across Panmingh, SnowCat, Butterf1y, or Panminway, they all refer to me. 
In any case, it’s nice to meet you.😃`;
export const email = 'panmingh@outlook.com'
export const githubUsername = 'snowcatsmoking'


// about page
export const aboutMeHeadline = 'About Me'
export const aboutParagraphs = [
  "Hello, I’d like you to call me SnowCat.",
  'I am currently preparing for my graduate applications for the Fall 2027 intake. If you have any advice, opportunities, or offers related to master’s or direct PhD applications, please feel free to contact me at any time.',
  'I am now an undergraduate student at Beijing University of Posts and Telecommunications, majoring in Telecommunications Engineering and Management. I first got involved in AI during my sophomore year, starting with some simple AI application projects.',
  'From my junior year onward, I began focusing on research projects, with a primary interest in large model safety and alignment. I am deeply interested in this field and have already produced several publications and preprints.',
  'In my spare time, I enjoy working on interesting side projects, although my free time has been steadily decreasing. Most of my recent outputs are reflected in my publications.',
  'I hope to continue maintaining stable and meaningful productivity in the years ahead.',
  ]

// blog
export const blogHeadLine = "What am I doing recently?"
export const blogIntro =`I am going to writing some blogs to share my thoughts and ideas on AI safety, alignment, and related topics.`

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
    name: 'OpenReview',
    ariaLabel: 'OpenReview Profile',
    icon: 'openreview',
    href: 'https://openreview.net/profile?id=~Minghui_Pan1',
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
]

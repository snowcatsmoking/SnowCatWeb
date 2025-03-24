// Types
export type ProjectItemType = {
  name: string
  description: string
  link: { href: string; label: string }
  tags: string[]
  icon?: string
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
export const awardsHeadLine = "奖项和荣誉（等到要投简历的时候再改）"
export const awardsIntro = "保持低调，等到要投简历的时候再改"

export const awards: Array<ActivityItemType> = [
  {
    name: '最好的2024年',
    description: '',
    date: '2024',
    location: 'Beijing,Haidian',
  },
  {
    name: '最好的2023年',
    description: '',
    date: '2023',
    location: 'Jiangsu,Yangzhou',
  },
]

// Research & Projects
export const projectHeadLine = "研究&项目"
export const projectIntro = "这个可以说道说道，我参加的项目一点也不少"

export const projects: Array<ProjectItemType> = [
  {
    name: 'iLEAD领创&&iTeach',
    description: '项目负责人，一手带大（北邮校园网才能点开）',
    link: { href: 'http://10.3.58.3:5173/login', label: 'iTeach' },
    tags: ['Website', 'Python', 'LLM', 'Rag'],
    icon: 'openai'

  },
  {
    name: 'BuTP',
    description: 'Cindy老师的项目，职业生涯模拟器',
    link: { href: '#', label: '还在沉淀，望你理解' },
    tags: ['MySQL', 'Java',"K-Means"],
    icon: 'langgraph'
  },
  {
    name: '工创赛智能救援赛道',
    description: '只会纯软件，跟我谈串口就投降',
    link: { href: '#', label: '开发完了，但是不开源' },
    tags: ['树莓派','OpenCV','Python'],
    icon: 'raspberrypi'
  },
  {
    name: 'Jailbreak Template',
    description: '针对垂直领域大模型的红队攻击框架',
    link: { href: '#', label: '还在沉淀，望你理解' },
    tags: ['Jailbreak', 'LLM','Safety'],
    icon: 'langchain'
  },
]

// Hobbies & Volunteer
export const activitiesHeadLine = "兴趣和志愿"
export const activitiesIntro = "个人兴趣和社区贡献"

export const activities: Array<ActivityItemType> = [
  {
    name: 'iLEAD&&iTeach',
    description:
      '工作即兴趣，等这个项目发展到位，我们再继续努力',
    date: '2024-09',
    location: 'Beijing',
    link:'http://10.3.58.3:5173/login',
    icon: 'openai'
  },
]

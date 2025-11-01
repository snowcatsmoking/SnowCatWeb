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
export const awardsHeadLine = "奖项和荣誉"
export const awardsIntro = "主要记录大学之后获得的奖项"

export const awards: Array<ActivityItemType> = [
  {
    name: 'ICLR2026在投',
    description: '多模态幻觉相关，第五作者',
    date: '2025',
    location: 'Rio de Janeiro, Brazil',
  },
  {
    name: 'ICASSP2026在投',
    description: 'LLM Security相关，第四作者',
    date: '2025',
    location: 'Barcelona, Spain',
  },
  {
    name: '大学生工程创新竞赛',
    description: '智能救援赛道北京市一等奖',
    date: '2025',
    location: 'Beijing,Haidian',
  },
  {
    name: '北京邮电大学三等奖学金',
    description: '',
    date: '2024',
    location: 'Beijing,Haidian',
  },
  {
    name: '大学生网络与信息技术大赛',
    description: '赛道三：全国三等奖',
    date: '2024',
    location: 'Beijing,Haidian',
  },
]

// Research & Projects
export const projectHeadLine = "研究&项目"
export const projectIntro = "这个可以说道说道，我参加的项目一点也不少"

export const projects: Array<ProjectItemType> = [
  {
    name: '多模态模型幻觉抑制',
    description: 'ICLR在投，第五作者',
    link: { href: 'https://arxiv.org/abs/2510.10285', label: 'ICLR' },
    tags: ['MLLM', 'Inner Safety'],
    icon: 'arxiv'
  },
  {
    name: 'iLEAD领创',
    description: '项目负责人（北邮校园网才能点开）',
    link: { href: '10.3.58.3:5173', label: 'iTeach' },
    tags: ['Website', 'Python', 'LLM', 'Rag'],
    icon: 'openai'
  },
  {
    name: 'BuTP',
    description: '学院个人发展计划项目，职业生涯模拟器',
    link: { href: '#', label: '还在沉淀，望你理解' },
    tags: ['MySQL', 'Java',"K-Means"],
    icon: 'langgraph'
  },
  {
    name: '工创赛智能救援赛道',
    description: 'Python循迹模块部分，树莓派部署',
    link: { href: '#', label: '开发完了，但是不开源' },
    tags: ['树莓派','OpenCV','Python'],
    icon: 'raspberrypi'
  },
  {
    name: 'CorrEctor（ICASSP在投）',
    description: '信工所实习期间共著论文，第四作者',
    link: { href: '#', label: '还在沉淀，望你理解' },
    tags: ['LLM','Security'],
    icon: 'arxiv'
  },
  {
    name: '“弗一把”信息熵脚本',
    description: '信息熵计算脚本，用最少次数解决“弗一把”问题',
    link: { href: 'https://github.com/snowcatsmoking/forsaken', label: '开源项目，欢迎star' },
    tags: ['Python','Hobbies'],
    icon: 'counterstrike'
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

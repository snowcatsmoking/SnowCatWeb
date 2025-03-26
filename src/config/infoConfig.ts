export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = 'SnowCat'
export const headline = '你好，我是雪豹'
export const introduction = `
如果你在一些游戏里面碰到ButterF1y，那也是我。
右边那个会转的球基本代表了我的技术栈。
还给大家埋了彩蛋☝️🤓`;
export const email = 'panmingh@outlook.com'
export const githubUsername = 'snowcatsmoking'

// about page
export const aboutMeHeadline = '我是谁，我又会给你介绍什么'
export const aboutParagraphs = [
  "你好，我希望你称我为SnowCat，但是你既然是通过panmingh.com找到我的，那我的真名你应该也知道了。",
  '我是一个北邮在读的学生，专业是电信工程及管理，但是我对计算机有着浓厚的兴趣，所以我会学习一些计算机相关的知识。',
  '我是一个比较低调的人，平时也不怎么发朋友圈和空间，这次大张旗鼓搞个网站是考虑到之后展示的时候更方便。',
  '我不会把很多个人信息放到这个网站上来，但是我会不断打磨这个网站，也会分享一些技术报告，写给大家也写给自己。',
  '右边是我的自拍，孩子们我就长这样。'
]

// blog
export const blogHeadLine = "我最近在忙啥？"
export const blogIntro =`你别管我在忙啥，反正在忙~~。
放点工作周报cos博客给大家看看吧。`

// social links
export type SocialLinkType = {
  name: string
  ariaLabel?: string
  icon: string
  href: string
}

export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/1295215102',
  },
]

// https://simpleicons.org/
export const techIcons = [
  'milvus',
  'pytorch',
  'linux',
  'raspberrypi',
  'java',
  'valve',
  'mysql',
  'valorant',
  'pycharm',
  'ieee',
  'republicofgamers',
  'intellijidea',
  'googlechrome',
  'beijingsubway',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'otto',
  'ios',
  'apple',
  'wechat',
  'onlyfans',
  'langchain',
  'openai',

]

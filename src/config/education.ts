// education
export type EducationItemType = {
  school: string
  major: string
  image?: string
  logo: string
  start: string
  end: string
}

export const educationList: Array<EducationItemType> = [
  {
    school: '北京邮电大学',
    major: '这是我的大学',
    logo: 'college',
    start: '2023',
    end: 'To be continued...',
  },
  {
    school: '扬州大学附属中学 ',
    major: '这是我的高中',
    logo: 'college',
    start: '2020',
    end: '2023',
  },
  {
    school: '扬州中学教育集团树人学校',
    major: '这是我的初中',
    logo: 'college',
    start: '2017',
    end: '2020',
  },
]

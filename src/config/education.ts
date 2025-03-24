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
    school: 'Tsinghua University',
    major: 'MBA',
    logo: 'college',
    start: '2017',
    end: '2020',
  },
  {
    school: 'University of Chicago ',
    major: 'Computer Science',
    logo: 'college',
    start: '2013',
    end: '2015',
  },
  {
    school: 'BUPT',
    major: 'Automation',
    logo: 'college',
    start: '2009',
    end: '2013',
  },
]

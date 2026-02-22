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
    school: 'Beijing University of Posts and Telecommunications',
    major: 'Telecommunications Engineering and Management',
    logo: 'college',
    start: '2023',
    end: '2027',
  },
]

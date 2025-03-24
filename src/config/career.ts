// career
export type CareerItemType = {
    company: string
    title: string
    image?: string
    logo: string
    start: string
    end: string
  }
  
export const careerList: Array<CareerItemType> = [
    {
      company: 'NTU红队攻击科研实习',
      title: 'RA（自己编的，实则没有职称）',
      logo: 'college',
      start: '2025',
      end: 'Present'
    },
    {
      company: 'iLEAD领创&&iTeach',
      title: '项目负责人',
      logo: 'college',
      start: '2024',
      end: 'Present'
    },
    {
      company: 'BuTP',
      title: '项目经理',
      logo: 'college',
      start: '2024',
      end: 'Present'
    },
    {
      company: '团委综合办公室（嘿嘿，我还干过团委）',
      title: '干事',
      logo: 'college',
      start: '2023',
      end: '2024'
    }
  ]
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
      title: '暂无',
      logo: 'college',
      start: '2025',
      end: 'Present'
    },
    {
      company: 'iLEAD领创',
      title: '项目负责人',
      logo: 'college',
      start: '2024',
      end: 'Present'
    },
    {
      company: 'BuTP职业生涯规划',
      title: '项目经理',
      logo: 'college',
      start: '2024',
      end: 'Present'
    },
    {
      company: '团委综合办公室',
      title: '干事',
      logo: 'college',
      start: '2023',
      end: '2024'
    }
  ]
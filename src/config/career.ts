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
      company: '中科院信息工程研究所科研实习',
      title: 'RA',
      logo: 'college',
      start: '2025-07',
      end: '2025-09'
    },
    {
      company: 'BUPT南国顺教授组科研实习',
      title: '本科生coauthor',
      logo: 'college',
      start: '2025-07',
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
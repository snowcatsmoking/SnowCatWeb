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
      company: 'Shanghai Soong Ching Ling School',
      title: 'Computer Science Teacher',
      logo: 'college',
      start: '2020',
      end: 'Present'
    },
    {
      company: 'Bigo Live',
      title: 'US Operations',
      logo: 'coffee',
      start: '2018',
      end: '2020'
    },
    {
      company: 'Sinovation Ventures',
      title: 'Investment Analyst',
      logo: 'bank',
      start: '2017',
      end: '2018'
    },
    {
      company: 'Expedia',
      title: 'Software Engineer',
      logo: 'coffee',
      start: '2015',
      end: '2017'
    }
  ]
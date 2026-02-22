// coauthors
export type CareerItemType = {
  company: string
  title: string
  image?: string
  logo: string
  start: string
  end: string
  href?: string
}

export const careerList: Array<CareerItemType> = [
  {
    company: 'Haolang Lu',
    title: 'BUPT PhD Student',
    logo: 'college',
    start: '',
    end: '',
    href: 'https://openreview.net/profile?id=~Haolang_Lu1',
  },  
  {
    company: 'Kun Wang',
    title: 'NTU Postdoc',
    logo: 'college',
    start: '',
    end: '',
    href: 'https://scholar.google.com/citations?user=UnyqjWQAAAAJ&hl=en',
  },
  {
    company: 'Guoshun Nan',
    title: 'BUPT Professor',
    logo: 'college',
    start: '',
    end: '',
    href: 'https://scholar.google.com/citations?user=uSykWkMAAAAJ&hl=en',
  },
  {
    company: 'Wentao Zhang',
    title: 'PKU Assistant Professor',
    logo: 'college',
    start: '',
    end: '',
    href: 'https://scholar.google.com/citations?user=JE4VON0AAAAJ&hl=zh-CN',
  },
]

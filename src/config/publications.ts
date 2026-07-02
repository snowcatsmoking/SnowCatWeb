// Author format:
//   name: display name
//   bold: underline + bold (you)
//   equal: show * superscript (equal contribution)
//   corresponding: show † superscript
//   ellipsis: render as "..."
export type AuthorType = {
  name: string
  bold?: boolean
  equal?: boolean
  corresponding?: boolean
  ellipsis?: boolean
}

export type PublicationItemType = {
  title: string
  authors: AuthorType[]
  venue: string
  year: string
  track?: string  // e.g. 'Findings', 'Oral', 'Spotlight'
  links: {
    paper?: string
    poster?: string
    slides?: string
    code?: string
    project?: string
  }
  image?: string  // filename under public/images/papers/
}

export const publicationsHeadLine = 'Publications'
export const publicationsIntro = 'Sincere thanks to all my coauthors for their great work and support.'

export const publications: Array<PublicationItemType> = [
  {
    // Haolang Lu*, Minghui Pan*, ..., Guoshun Nan†
    title: 'Streaming Hallucination Detection in Long Chain-of-Thought Reasoning',
    authors: [
      { name: 'Haolang Lu', equal: true },
      { name: 'Minghui Pan', bold: true, equal: true },
      { name: 'Ripeng Li', equal: true },
      { name: 'Guoshun Nan', corresponding: true },
      { name: '...', ellipsis: true },
      { name: 'Kun Wang' },
      { name: 'Yang Liu'},
    ],
    venue: 'ACL',
    year: '2026',
    track: 'Findings',
    links: {
      paper: 'https://arxiv.org/abs/2601.02170v1',
      code: 'https://github.com/snowcatsmoking/StreamingHallucination',
    },
    image: 'acl2026.png',
  },
  {
    // Chengyu Shen†, ..., Minghui Pan, ..., Wentao Zhang
    title: 'One-Eval: An Agentic System for Automated and Traceable LLM Evaluation',
    authors: [
      { name: 'Chengyu Shen', equal: true },
      { name: 'Yanheng Hou', equal: true },
      { name: 'Minghui Pan', equal: true, bold: true },
      { name: '...', ellipsis: true },
      { name: 'Wentao Zhang', corresponding: true },
    ],
    venue: 'Arxiv',
    year: '2026',
    track: 'Preprint',
    links: {
      paper: 'https://arxiv.org/abs/2603.09821',
      code: 'https://github.com/OpenDCAI/One-Eval',
    },
    image: 'oneeval.png',
  },
  {
    // Haolang Lu*, ..., Minghui Pan, ..., Kun Wang†
    title: 'Reallocating Attention Across Layers to Reduce Multimodal Hallucination',
    authors: [
      { name: 'Haolang Lu', equal: true },
      { name: 'Bolun Chu', equal: true },
      { name: 'Weiye Fu' },
      { name: 'Guoshun Nan', corresponding: true },
      { name: '...', ellipsis: true },
      { name: 'Minghui Pan', bold: true },
      { name: '...', ellipsis: true },
      { name: 'Kun Wang' },
    ],
    venue: 'CVPR',
    year: '2026',
    track: 'Poster',
    links: {
      paper: 'https://arxiv.org/abs/2510.10285',
    },
    image: 'cvpr2026.png',
  },
  {
    title: 'Corrector: An Execute-to-Correct Paradigm for Efficient LLM Secure Inference',
    authors: [
      { name: 'Dong Liu'},
      { name: 'Bingzheng Wang'},
      { name: 'Yifan Zeng'},
      { name: 'Minghui Pan', bold: true },
      { name: '...', ellipsis: true },
      { name: 'Xiaoyan Gu', corresponding: true },
    ],
    venue: 'ICASSP',
    year: '2026',
    track: 'Poster',
    links: {
      paper: 'https://ieeexplore.ieee.org/abstract/document/11462929',
    },
    image: 'icassp2026.png',
  },
]

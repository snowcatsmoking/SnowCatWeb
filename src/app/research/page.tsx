import { type Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { PublicationCard } from '@/components/research/PublicationCard'
import { publications, publicationsHeadLine, publicationsIntro } from '@/config/publications'
import { FlaskConical } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Publications and research work by Minghui Pan.',
}

export default function Research() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-3xl">
        <h1 className="flex flex-row items-center gap-3 text-3xl font-bold tracking-tight opacity-80">
          <FlaskConical size={32} />
          {publicationsHeadLine}
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-xl">
          {publicationsIntro}
        </p>
      </div>

      <ul className="mt-12 divide-y divide-muted">
        {publications.map((pub) => (
          <PublicationCard key={pub.title} pub={pub} />
        ))}
      </ul>
    </Container>
  )
}

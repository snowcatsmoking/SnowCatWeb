'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FileText, Presentation, Code, Globe, BookOpen } from 'lucide-react'
import { AuthorType, PublicationItemType } from '@/config/publications'
import { cn } from '@/lib/utils'
import { useState } from 'react'

function Author({ author, isLast }: { author: AuthorType; isLast: boolean }) {
  if (author.ellipsis) {
    return <span className="text-muted-foreground">{isLast ? '...' : '..., '}</span>
  }

  const nameEl = author.bold ? (
    <strong className="font-semibold underline underline-offset-2 text-foreground">
      {author.name}
    </strong>
  ) : (
    <span>{author.name}</span>
  )

  return (
    <span>
      {nameEl}
      {author.equal && <sup className="text-xs ml-0.5">*</sup>}
      {author.corresponding && <sup className="text-xs ml-0.5">†</sup>}
      {!isLast && ', '}
    </span>
  )
}

export function PublicationCard({ pub }: { pub: PublicationItemType }) {
  const [imgError, setImgError] = useState(false)
  const imageSrc = pub.image ? `/images/papers/${pub.image}` : null

  return (
    <li className="group flex flex-col sm:flex-row gap-6 py-8 border-b border-muted last:border-0">
      {/* 主图 */}
      <div className="flex-shrink-0 w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-muted/40 border border-muted flex items-center justify-center">
        {imageSrc && !imgError ? (
          <Image
            src={imageSrc}
            alt={pub.title}
            width={384}
            height={256}
            sizes="(max-width: 640px) 100vw, 192px"
            quality={90}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <BookOpen size={32} className="text-muted-foreground/40" />
        )}
      </div>

      {/* 内容 */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* Venue badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
              {pub.venue} {pub.year}
            </span>
            {pub.track && (
              <span className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                pub.track === 'Best Paper'   && "bg-yellow-100 text-yellow-800 ring-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:ring-yellow-700",
                pub.track === 'Outstanding'  && "bg-orange-100 text-orange-700 ring-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:ring-orange-700",
                pub.track === 'Oral'         && "bg-purple-100 text-purple-700 ring-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:ring-purple-700",
                pub.track === 'Spotlight'    && "bg-blue-100 text-blue-700 ring-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-700",
                pub.track === 'Findings'     && "bg-green-100 text-green-700 ring-green-300 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-700",
                pub.track === 'Poster'       && "bg-teal-100 text-teal-700 ring-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:ring-teal-700",
                pub.track === 'Preprint'     && "bg-muted text-muted-foreground ring-muted-foreground/20",
                !['Best Paper','Outstanding','Oral','Spotlight','Findings','Poster','Preprint'].includes(pub.track) &&
                                               "bg-muted text-muted-foreground ring-muted-foreground/20",
              )}>
                {pub.track}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold leading-snug mb-2">
            {pub.links.paper ? (
              <Link
                href={pub.links.paper}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {pub.title}
              </Link>
            ) : (
              pub.title
            )}
          </h3>

          {/* Authors */}
          <p className="text-sm text-muted-foreground">
            {pub.authors.map((a, i) => (
              <Author key={i} author={a} isLast={i === pub.authors.length - 1} />
            ))}
          </p>
        </div>

        {/* Link icons */}
        <div className="flex items-center gap-3 mt-4">
          {pub.links.paper && (
            <Link
              href={pub.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              title="Paper"
              className={cn(
                'flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors',
              )}
            >
              <FileText size={15} />
              <span>Paper</span>
            </Link>
          )}
          {pub.links.poster && (
            <Link
              href={pub.links.poster}
              target="_blank"
              rel="noopener noreferrer"
              title="Poster"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Presentation size={15} />
              <span>Poster</span>
            </Link>
          )}
          {pub.links.slides && (
            <Link
              href={pub.links.slides}
              target="_blank"
              rel="noopener noreferrer"
              title="Slides"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Presentation size={15} />
              <span>Slides</span>
            </Link>
          )}
          {pub.links.code && (
            <Link
              href={pub.links.code}
              target="_blank"
              rel="noopener noreferrer"
              title="Code"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Code size={15} />
              <span>Code</span>
            </Link>
          )}
          {pub.links.project && (
            <Link
              href={pub.links.project}
              target="_blank"
              rel="noopener noreferrer"
              title="Project Page"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe size={15} />
              <span>Project</span>
            </Link>
          )}
          {Object.values(pub.links).every((v) => !v) && (
            <span className="text-xs text-muted-foreground/50 italic">Coming soon</span>
          )}
        </div>
      </div>
    </li>
  )
}

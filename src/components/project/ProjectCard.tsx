"use client"

import { memo, useMemo } from 'react'
import { HashIcon } from 'lucide-react'
import Link from 'next/link'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Favicon } from "favicon-stealer"
import { ProjectItemType } from '@/config/infoConfig'
import { utm_source } from '@/config/siteConfig'
import { ThemedIcon } from '@/components/shared/ThemedIcon'
import { addUtmParams, cn } from '@/lib/utils'
import { ANIMATION_DURATION } from '@/lib/constants'

interface ProjectCardProps {
  project: ProjectItemType
  titleAs?: keyof JSX.IntrinsicElements
}

export const ProjectCard = memo(function ProjectCard({ project, titleAs }: ProjectCardProps) {
  const utmLink = useMemo(() => 
    addUtmParams(project.link.href, utm_source),
    [project.link.href]
  )
  
  const Component = titleAs ?? 'h2'
  
  return (
    <li className='group relative flex flex-col items-start h-full'>
      <div className={cn(
        "relative flex flex-col justify-between h-full w-full p-6 rounded-2xl",
        "border border-muted-foreground/20 shadow-sm bg-card backdrop-blur-sm",
        "transition-all group-hover:scale-[1.02] group-hover:shadow-xl",
        "group-hover:bg-muted/10 group-hover:border-muted-foreground/30",
        "group-hover:-translate-y-1"
      )} style={{ transitionDuration: `${ANIMATION_DURATION.normal}ms` }}>
        <div className=''>
          <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-4'>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50 transition-colors group-hover:bg-muted/80">
              {project.icon ? (
                <ThemedIcon 
                  iconName={project.icon}
                  alt={`${project.name} icon`}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              ) : (
                <Favicon url={project.link.href} />
              )}
            </div>
            <Component className="text-base font-semibold">
              {project.name}
            </Component>
          </div>
          <p className="relative z-10 mt-2 text-sm text-muted-foreground ml-2">
            {project.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-4 ml-1">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-2 items-center">
              {project.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center space-x-0.5 group"
                >
                  <HashIcon className="w-3 h-3 text-muted-foreground icon-scale" />
                  <span className="text-xs text-muted-foreground tracking-tighter">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link
          href={utmLink}
          target='_blank'
          rel='noopener noreferrer'
          className='absolute inset-0 z-20'>
          <ArrowUpRight size={32} weight="duotone" className="absolute top-6 right-6 h-4 w-4 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:cursor-pointer" />
        </Link>
      </div>
    </li>
  )
})
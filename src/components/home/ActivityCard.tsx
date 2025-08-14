"use client"

import { Calendar, Clock, MapPin } from 'lucide-react'
import { ActivityItemType } from '@/config/projects'
import Link from 'next/link'

export function ActivityCard({ activity, titleAs }: { activity: ActivityItemType, titleAs?: keyof JSX.IntrinsicElements }) {
  let Component = titleAs ?? 'h2'
  return (
    <li className='group relative flex flex-col items-start h-full'>
      <div className="relative flex flex-col justify-between h-full w-full py-5 px-6 rounded-2xl border border-muted-foreground/20 shadow-sm transition-all group-hover:scale-[1.03] group-hover:shadow-md group-hover:bg-muted/5">
        <div className=''>
          <div className='flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center gap-2'>
            <Calendar size={20} />
            <Component className="text-sm font-semibold tracking-tight">
              {activity.name}
            </Component>
          </div>
          <p className="relative z-10 mt-2 text-sm text-muted-foreground">
            {activity.description}
          </p>
        </div>

        <div className="relative z-10 mt-auto pt-4">
          <div className='flex flex-row items-center gap-4 text-xs font-semibold opacity-80'>
            <div className="flex items-center gap-1">
              <Clock size={16} /> 
              {activity.date}
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} /> 
              {activity.location}
            </div>
          </div>
        </div>
      </div>
      {activity.link && (
        <Link
          href={activity.link}
          target='_blank'
          rel='noopener noreferrer'
          className='absolute inset-0 z-20'
        />
      )}
    </li>
  )
}

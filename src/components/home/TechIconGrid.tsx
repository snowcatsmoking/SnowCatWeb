import Image from 'next/image'
import { techIcons } from '@/config/infoConfig'

export default function TechIconGrid() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold tracking-tight md:text-2xl opacity-80 text-center md:text-right">Tools & Tech</h3>
    <div className="grid grid-cols-5 gap-4 justify-items-center md:justify-items-end">
      {techIcons.map((slug) => (
        <div
          key={slug}
          className="group flex items-center justify-center w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted hover:scale-110 transition-all duration-200 cursor-default"
        >
          <Image
            src={`/images/techIcons/${slug}.svg`}
            alt={slug}
            width={28}
            height={28}
            className="dark:invert opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
    </div>
  )
}

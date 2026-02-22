import { Users } from 'lucide-react'
import { CareerItemType, careerList } from '@/config/infoConfig'
import Link from 'next/link'

function CareerItem({ careerItem }: { careerItem: CareerItemType }) {
  const nameEl = (
    <span className="w-full flex-none text-sm font-medium">
      {careerItem.company}
    </span>
  )

  return (
    <li className="flex items-center justify-between gap-2">
      {careerItem.href ? (
        <Link
          href={careerItem.href}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium hover:text-teal-500 transition-colors"
        >
          {careerItem.company}
        </Link>
      ) : (
        <span className="text-sm font-medium">{careerItem.company}</span>
      )}
      {careerItem.title && (
        <span className="text-xs text-muted-foreground">{careerItem.title}</span>
      )}
    </li>
  )
}

export default function Career() {
  return (
    <div className="rounded-2xl border border-muted shadow-sm p-6">
      <h2 className="flex text-sm font-semibold">
        <Users size={24} />
        <span className="ml-3">Coauthors</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {careerList.map((careerItem, careerItemIndex) => (
          <CareerItem key={careerItemIndex} careerItem={careerItem} />
        ))}
      </ol>
    </div>
  )
}

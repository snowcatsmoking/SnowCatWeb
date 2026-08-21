import { documents } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Documents({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {documents.map((doc) => (
        <Button key={doc.name} asChild variant="outline" size="sm">
          <a href={doc.href} download={doc.downloadName}>
            <CustomIcon name="file-pdf" size={16} />
            {doc.name}
            <CustomIcon name="download" size={14} />
          </a>
        </Button>
      ))}
    </div>
  )
}

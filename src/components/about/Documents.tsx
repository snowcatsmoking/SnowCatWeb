import { documents } from '@/config/infoConfig'
import { CustomIcon } from '@/components/shared/CustomIcon'

export default function Documents() {
  return (
    <div className="mt-8 border-t pt-8">
      <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
        Documents
      </h2>
      <div className="mt-4 space-y-3">
        {documents.map((doc) => (
          <a
            key={doc.name}
            href={doc.href}
            download={doc.downloadName}
            className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4 transition hover:border-teal-500 hover:bg-teal-50/50 dark:border-zinc-700/40 dark:hover:border-teal-500 dark:hover:bg-teal-500/5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 group-hover:text-teal-600 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:text-teal-400">
                <CustomIcon name="file-pdf" size={22} />
              </span>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {doc.name}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {doc.description}
                </p>
              </div>
            </div>
            <span className="flex-none text-zinc-400 transition group-hover:text-teal-600 dark:group-hover:text-teal-400">
              <CustomIcon name="download" size={18} />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

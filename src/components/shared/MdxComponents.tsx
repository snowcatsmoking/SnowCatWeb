import { type MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href
  if (href?.startsWith('/')) {
    return (
      <Link
        href={href}
        {...props}
        className="font-semibold text-primary underline decoration-1 underline-offset-2 hover:decoration-2"
      />
    )
  }
  if (href?.startsWith('#')) {
    return (
      <a
        {...props}
        className="font-semibold text-primary underline decoration-1 underline-offset-2 hover:decoration-2"
      />
    )
  }
  return (
    <a
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
      className="font-semibold text-primary underline decoration-1 underline-offset-2 hover:decoration-2"
    />
  )
}

export const mdxComponents: MDXComponents = {
  Image: (props: ImageProps) => (
    <Image {...props} alt={props.alt || ''} className="my-6 rounded-3xl" />
  ),
  a: CustomLink,
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="my-6 text-4xl font-bold tracking-tight sm:text-5xl"
      {...props}
    />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="my-6 text-3xl font-bold tracking-tight sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="my-6 text-2xl font-bold tracking-tight sm:text-3xl"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-6 text-base opacity-80" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-6 mt-6 list-inside list-disc text-base opacity-80"
      {...props}
    />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-6 mt-6 list-inside list-decimal text-base opacity-80"
      {...props}
    />
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-zinc-300 pl-4 italic dark:border-zinc-700"
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code className="my-6 rounded-lg px-1 py-0.5 bg-muted" {...props} />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-3xl bg-muted p-6 text-sm tracking-tight text-muted-foreground"
      {...props}
    />
  ),
}

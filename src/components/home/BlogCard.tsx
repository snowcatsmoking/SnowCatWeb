import { memo } from 'react'
import { Card } from '@/components/shared/Card'
import { formatDate } from '@/lib/formatDate'
import { type BlogType } from '@/lib/blogs'

interface BlogCardProps {
  blog: BlogType
  titleAs?: keyof JSX.IntrinsicElements
}

export const BlogCard = memo(function BlogCard({ blog, titleAs }: BlogCardProps) {
  const as = titleAs ?? 'h2'
  return (
    <Card as="article">
      <Card.Title as={as} href={`/blogs/${blog.slug}`}>
        {blog.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={blog.date} decorate>
        {formatDate(blog.date)}
      </Card.Eyebrow>
      <Card.Description>{blog.description}</Card.Description>
      <Card.Cta>Read blog</Card.Cta>
    </Card>
  )
})

import { Container } from '@/components/layout/Container'
import Career from '@/components/home/Career'
import Education from '@/components/home/Education'
import SocialLinks from '@/components/home/SocialLinks'
import { headline, introduction } from '@/config/infoConfig'
import { BlogCard } from '@/components/home/BlogCard'
import { getAllBlogs, type BlogType } from '@/lib/blogs'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ActivityCard } from '@/components/home/ActivityCard'
import { projectHeadLine, projectIntro, projects, blogHeadLine, blogIntro } from '@/config/infoConfig'
import { awards, awardsHeadLine, awardsIntro, activities, activitiesHeadLine, activitiesIntro } from '@/config/projects'
import TechIconGrid from '@/components/home/TechIconGrid'
import { Award, Briefcase, Heart } from 'lucide-react'

export default async function Home() {
  let blogList = (await getAllBlogs()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        {/* personal info */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-start">
          <div className='md:mt-20'>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl opacity-80">
              {headline}
            </h2>
            <div className="mt-6 space-y-4 text-xl text-muted-foreground">
              {introduction.split('\n').filter(Boolean).map((paragraph, index) => (
                <p key={index} className={paragraph.startsWith('Chinese Version') ? 'font-semibold text-teal-600 dark:text-teal-400' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
            <SocialLinks className='mt-4 md:mt-4'/>
          </div>
          <div className="md:mt-20 px-4">
            <TechIconGrid />
          </div>
        </div>
        {/* Research & Projects */}
        <div className="mx-auto flex flex-col max-w-xl gap-6 lg:max-w-none my-4 py-8 border-t border-muted">
          <h2 className="flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
            <Briefcase size={28}/>
            {projectHeadLine}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mb-8">
            {projectIntro}
          </p>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
          >
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} titleAs='h3'/>
            ))}
          </ul>
        </div>
        {/* Awards */}
        <div className="mx-auto flex flex-col max-w-xl gap-6 lg:max-w-none my-4 py-8 border-t border-muted">
          <h2 className="flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
            <Award size={28}/>
            {awardsHeadLine}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mb-8">
            {awardsIntro}
          </p>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
          >
            {awards.map((award) => (
              <ActivityCard key={award.name} activity={award} titleAs='h3'/>
            ))}
          </ul>
        </div>
        {/* Hobbies & Volunteer */}
        <div className="mx-auto flex flex-col max-w-xl gap-6 lg:max-w-none my-4 py-8 border-t border-muted">
          <h2 className="flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
            <Heart size={28}/>
            {activitiesHeadLine}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mb-8">
            {activitiesIntro}
          </p>
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3"
          >
            {activities.map((activity) => (
              <ActivityCard key={activity.name} activity={activity} titleAs='h3'/>
            ))}
          </ul>
        </div>

        {/* Blog Section */}
        <div className="mx-auto flex flex-col max-w-xl gap-6 py-8 my-8 lg:max-w-none border-t border-muted">
          <h2 className="flex flex-row items-center justify-start gap-2 text-xl font-semibold tracking-tight md:text-3xl opacity-80 mb-4">
            {blogHeadLine}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mb-8">
            {blogIntro}
          </p>
        </div>
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          {/* left column */}
          {/* blog */}
          <div className="flex flex-col gap-16">
            {blogList.map((blog: BlogType) => (
              <BlogCard key={blog.slug} blog={blog} titleAs='h3'/>
            ))}
          </div>

          {/* right column */}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Career />
            <Education />
          </div>
        </div>
      </Container>
    </>
  )
}

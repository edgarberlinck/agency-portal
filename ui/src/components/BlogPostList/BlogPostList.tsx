import { usePageStore } from "@/store/pagesStore"

type BlogPostTypeProp = {
  title: string
  display: string // TODO: Turn this into a enum
}
const BlogPostList: React.FC<BlogPostTypeProp> = ({ title, display }) => {
  const blogPosts = usePageStore(state => state.blogPosts)

  return (
    <div className="p-4">
      <h1 aria-label={title} className='text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>{title}</h1>
      <small>Amazingly displaying as {display}</small>

      { blogPosts?.map((blogPost) => <div key={blogPost.id}>
        <h1>{blogPost.attributes.title}</h1>
        <small>Published at: {blogPost.attributes.createdAt.toString()}</small>
        </div>) }
    </div>
  )
}

export default BlogPostList
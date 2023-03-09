type BlogPostTypeProp = {
  title: string
  display: string // TODO: Turn this into a enum
}
const BlogPostList: React.FC<BlogPostTypeProp> = ({ title, display }) => {
  return (
    <div className="p-4">
      <h1 aria-label={title} className='text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>{title}</h1>
      <small>Amazingly displaying as {display}</small>
    </div>
  )
}

export default BlogPostList
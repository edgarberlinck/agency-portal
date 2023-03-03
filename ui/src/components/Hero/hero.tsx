import { StrapiImage } from "@/common/types/strapi"
import Image from 'next/image'
interface Props {
  description: string
  title: string
  image: StrapiImage
}

export default function Hero ({ description, title, image }: Props) {
  return <div className='p-4 m-0 flex gap-4'>
    {image && (
      <figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter">
        <a href="#">
          <Image className='h-auto max-w-full rounded-lg shadow-md shadow-gray-700' src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}${image.data?.attributes.formats.large?.url}`} alt={description} width={500} height={500}/>
        </a>
        <figcaption className="absolute text-center px-4 text-lg text-white bottom-6">
          <p>Give-me this candy. Pleaaaaaaaase</p>
        </figcaption>
      </figure>
    )}
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{title}</h1>
      <hr></hr>
      <p className="mb-6 mt-4 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{description}</p>
    </div>
  </div>
}
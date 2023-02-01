import { StrapiImage } from "@/common/types/strapi"

interface Props {
  description: string
  title: string
  image: StrapiImage
}

export default function Hero ({ description, title, image }: Props) {
  return <div>
    <h1>{title}</h1>
    <p>{description}</p>
    {image && <img src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}${image.data?.attributes.formats.large?.url}`} />}
  </div>
}
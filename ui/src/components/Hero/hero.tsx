interface Props {
  description: string
  title: string
}

export default function Hero ({ description, title }: Props) {
  return <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
}
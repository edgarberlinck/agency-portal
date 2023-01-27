import { StrapiBlock } from "@/common/types/strapiBlockComponents";
import Heading from "./Heading/heading";
import Hero from "./Hero/hero";

interface Props {
  component: StrapiBlock
}

const Components = {
  Heading: 'components.heading',
  Hero: 'components.hero'
}

export default function ComponentRender({component}: Props) {
  switch(component.__component) {
    case Components.Heading:
      return <Heading />
    case Components.Hero:
      return <Hero description={component["description"]} title={component["title"]} />
    default:
      return <></>
  }
}
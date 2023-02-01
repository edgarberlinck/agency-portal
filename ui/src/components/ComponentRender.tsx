import { StrapiBlock } from "@/common/types/strapiBlockComponents";
import Heading from "./Heading/heading";
import Hero from "./Hero/hero";

interface Props {
  component: StrapiBlock
}

const Components = {
  Heading: 'ComponentComponentsHeading',
  Hero: 'ComponentComponentsHero'
}

export default function ComponentRender({component}: Props) {
  switch(component.__typename) {
    case Components.Heading:
      return <Heading />
    case Components.Hero:
      return <Hero description={component["description"]} title={component["title"]} image={component["image"] ?? null} />
    default:
      return <></>
  }
}
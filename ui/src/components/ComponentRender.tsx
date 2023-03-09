import { StrapiBlock } from "@/common/types/strapiBlockComponents";
import Heading from "./Heading/heading";
import Hero from "./Hero/hero";
import BlogPostList from "./BlogPostList/BlogPostList";

interface Props {
  component: StrapiBlock
}

const Components = {
  Heading: 'ComponentComponentsHeading',
  Hero: 'ComponentComponentsHero',
  ComponentComponentsBlogPostList: 'ComponentComponentsBlogPostList'
}

export default function ComponentRender({component}: Props) {
  switch(component.__typename) {
    case Components.Heading:
      return <Heading />
    case Components.Hero:
      return <Hero description={component["description"]} title={component["title"]} image={component["image"] ?? null} />
    case Components.ComponentComponentsBlogPostList:
      return <BlogPostList title={component['title']} display={component["display"]} />
    default:
      return <></>
  }
}
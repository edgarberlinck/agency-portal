import { StrapiPageAttributes, StrapiResource } from "@/common/types/strapi"
import ComponentRender from "@/components/ComponentRender"
import { queryResource } from "@/lib/strapiGraphQL"
import { GetServerSideProps } from 'next'

type ContentPropType = {
  content: StrapiResource<StrapiPageAttributes>
}

export const getServerSideProps: GetServerSideProps<ContentPropType> = async (ctx) => {
  const data = await queryResource<StrapiResource<StrapiPageAttributes>>('page', { id: Number(ctx.query.id as string) })
  
  return {
    props: {
      content: data  
    }
  }
}

export default function ContentPage({ content }: ContentPropType) {  
  return <>
    {content?.attributes.blocks?.map((block, index) => <ComponentRender component={block} key={`${block.__component}[${index}]`} />)}
  </>
}
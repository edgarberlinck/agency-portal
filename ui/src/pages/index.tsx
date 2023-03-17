import Head from 'next/head'
import { GetStaticProps } from 'next'
import { StrapiResource, StrapiPageAttributes, StrapiSeoConfig, StrapiBlogPost } from '@/common/types/strapi'
import { GeneralServerConfig } from '@/common/constants/server'
import ComponentRender from '@/components/ComponentRender'
import { queryResource } from '@/lib/strapiGraphQL'
import { usePageStore } from '@/store/pagesStore'

interface Props {
  pages: StrapiResource<StrapiPageAttributes>[]
  seo: StrapiResource<StrapiSeoConfig>
  homePage: StrapiResource<StrapiPageAttributes> | undefined
  blogPosts: StrapiResource<StrapiBlogPost>[] | undefined
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const defaultPageConfig = {
    revalidate: GeneralServerConfig.revalidationTime
  }
  
  try {
    const seoConfig = await queryResource<StrapiResource<StrapiSeoConfig>>('seoConfig')
    const pages = await queryResource<StrapiResource<StrapiPageAttributes>[]>('pages')
    const blogPosts = await queryResource<StrapiResource<StrapiBlogPost>[]>('blogPosts')

    const initialPageInfo = pages?.find(page => page.attributes.defaultHomepage)
    
    let homePage = undefined
    if (initialPageInfo) {
      const data = await queryResource<StrapiResource<StrapiPageAttributes>>('page', { id: initialPageInfo.id })
      homePage = data
    }

    return {
      ...defaultPageConfig,
      props: {
        pages: pages.filter(page => !page.attributes.defaultHomepage),
        seo: seoConfig,
        homePage,
        blogPosts
      },
    }
  } catch (e) {
    return {
      ...defaultPageConfig,
      redirect: {
        destination: '/500',
        permanent: false
      }
    }
  }
}

export default function Home({ pages, seo, homePage, blogPosts }: Props) {
  usePageStore.setState({
    homePage,
    pages,
    blogPosts
  })
  
  return (
    <>
      <Head>
        <title>{ seo.attributes.title }</title>
        <meta name="description" content={seo.attributes.description} />
        <meta name="keywords" content={seo.attributes.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {homePage?.attributes.blocks?.map((block, index) => <ComponentRender component={block} key={`${block.__component}[${index}]`} />)}
      </main>
    </>
  )
}

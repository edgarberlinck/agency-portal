import Head from 'next/head'
import { GetStaticProps } from 'next'
import { StrapiApiResponse, StrapiResource, StrapiPageAttributes, StrapiSeoConfig } from '@/common/types/strapi'
import { getResource } from '@/lib/strapi'
import { RequestError, ResourceConfiguration } from '@/common/types/resources'
import { GeneralServerConfig } from '@/common/constants/server'
import ComponentRender from '@/components/ComponentRender'

interface Props {
  pages: StrapiResource<StrapiPageAttributes>[]
  seo: StrapiResource<StrapiSeoConfig>
  homePage: StrapiResource<StrapiPageAttributes> | undefined
}

async function fetchResource<T>(resource: string, config?: ResourceConfiguration): Promise<StrapiApiResponse<T>> {
  const response: StrapiApiResponse<T> | RequestError = await getResource<T>(resource, config)
  
  if ("data" in response) {
    return response
  }

  throw new Error(response.message)
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const defaultPageConfig = {
    revalidate: GeneralServerConfig.revalidationTime
  }
  
  try {
    const pages = await fetchResource<StrapiResource<StrapiPageAttributes>[]>('/pages')
    const seoConfig = await fetchResource<StrapiResource<StrapiSeoConfig>>('/seo-config')
    const initialPageInfo = pages.data?.find(page => page.attributes.defaultHomepage)
    
    let homePage = undefined
    if (initialPageInfo) {
      const data = await fetchResource<StrapiResource<StrapiPageAttributes>>(`/pages/${initialPageInfo.id}`, { populate: true })
      homePage = data.data
    }

    return {
      ...defaultPageConfig,
      props: {
        pages: pages.data,
        seo: seoConfig.data,
        homePage
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

export default function Home({ pages, seo, homePage }: Props) {
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

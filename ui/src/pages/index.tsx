import Head from 'next/head'
import { GetStaticProps } from 'next'
import { StrapiApiResponse, StrapiResource, StrapiPageAttributes, StrapiSeoConfig } from '@/common/types/strapi'
import { getResource } from '@/lib/strapi'
import { RequestError } from '@/common/types/resources'
import { GeneralServerConfig } from '@/common/constants/server'

interface Props {
  pages: StrapiResource<StrapiPageAttributes>[]
  seo: StrapiResource<StrapiSeoConfig>
}

async function fetchResource<T>(resource: string): Promise<StrapiApiResponse<T>> {
  const response: StrapiApiResponse<T> | RequestError = await getResource<T>(resource)
  
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

    return {
      ...defaultPageConfig,
      props: {
        pages: pages.data,
        seo: seoConfig.data
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

export default function Home({ pages, seo }: Props) {
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
      <h1 className="text-3xl font-bold underline">
        Available Pages
      </h1>
      { pages.map((page: StrapiResource<StrapiPageAttributes>) => 
        <span key={page.attributes.slug}>{page.attributes.title}</span>
      )}
      </main>
    </>
  )
}

export type StrapiApiResponse<T> = {
  data: T
  meta?: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    },
  }
}

export enum StrapiPageLocale {
  en
}


export interface StrapiResource<T> {
  id: number
  attributes: T
}

interface StrapiBaseResource {
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
  locale: StrapiPageLocale,
}

export interface StrapiPageAttributes extends StrapiBaseResource {
  title: string,
  slug: string,
  defaultHomepage: boolean,
}

export interface StrapiSeoConfig extends StrapiBaseResource {
  title: string,
  description: string,
  keywords: string
}
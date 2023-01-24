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

export type StrapiPageAttributes = {
  title: string,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date,
  locale: StrapiPageLocale,
  slug: string,
  defaultHomepage: boolean
}

export type StrapiPage = {
  id: number,
  attributes: StrapiPageAttributes
}
import { StrapiBlock } from "./strapiBlockComponents"

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
  blocks?: StrapiBlock[]
}

export interface StrapiSeoConfig extends StrapiBaseResource {
  title: string,
  description: string,
  keywords: string
}

type StrapiWebImage =  {
  ext: string,
  url: string,
  hash: string,
  mime: string,
  name: string,
  path: string,
  size: string,
  width: string,
  height: string
}

export type StrapiImage = {
  data: {
    id: string
    attributes: {
      name: string
      alternativeText: string
      caption: string
      formats: {
        large?: StrapiWebImage
        small?: StrapiWebImage
        medium?: StrapiWebImage
        thumbnail?: StrapiWebImage
      }
    }
  }
}
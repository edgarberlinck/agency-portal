import { StrapiBlogPost, StrapiPageAttributes, StrapiResource } from '@/common/types/strapi'
import { create } from 'zustand'

interface PageStoreType {
  homePage: StrapiResource<StrapiPageAttributes> | undefined | null
  pages: StrapiResource<StrapiPageAttributes>[] | undefined | null
  blogPosts: StrapiResource<StrapiBlogPost>[] | undefined | null
  getPageBySlug: (slug: string) => StrapiResource<StrapiPageAttributes> | undefined
}

export const usePageStore = create<PageStoreType>((set, get) => ({
  homePage: null,
  pages: null,
  blogPosts: null,
  
  getPageBySlug: (slug: string): StrapiResource<StrapiPageAttributes> | undefined => {
    return get().pages?.find(page => page.attributes.slug === slug)
  }
}))
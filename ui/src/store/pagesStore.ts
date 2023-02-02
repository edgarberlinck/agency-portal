import { StrapiPageAttributes, StrapiResource } from '@/common/types/strapi'
import { create } from 'zustand'

interface PageStoreType {
  homePage: StrapiResource<StrapiPageAttributes> | undefined | null
  pages: StrapiResource<StrapiPageAttributes>[] | undefined | null
}

export const usePageStore = create<PageStoreType>(() => ({
  homePage: null,
  pages: null
}))
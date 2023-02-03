import { usePageStore } from "@/store/pagesStore"
import { Kanit } from '@next/font/google'
import Link from "next/link"

const brandFont = Kanit({ weight: "400", subsets: ['latin'] })

export default function Heading () {
  const pages = usePageStore(store => store.pages)

  return <div className="relative bg-slate-200 dark:bg-slate-900">
    <div className="max-w-7xl px-1">
      <div className="flex items-center py-5 px-2 justify-start sm:space-x-5 text-black dark:text-white">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href='/'>
            {/* TODO: Should come from Strapi */}
            <span className="sr-only">edgarberlinck.com</span>
            <span className={`${brandFont.className} md:text-2xl sm:text-xl hover:underline`}>edgarberlinck.com</span>
          </Link>
        </div>
        
        { pages?.map((page) => (
          <span key={page.id} className="text-base font-medium text-gray-500 hover:text-gray-900">
            {page.attributes.title}
          </span>
        )) }
      </div>
    </div>
  </div>
}
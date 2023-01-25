import { RequestError, ResourceConfiguration } from "@/common/types/resources"
import { StrapiApiResponse } from "@/common/types/strapi"
import { getErrorMessage } from "@/common/utils"

const HTTP_STATUS_OK = [200, 201]

export async function getResource<T>(resourceUri: string, config?: ResourceConfiguration): Promise<StrapiApiResponse<T> | RequestError>  {
  const strapiApiToken = process.env.STRAPI_API_ACCESS
  const stripiUri = process.env.STRAPI_URI

  const headers = new Headers({
    authorization: `Bearer ${strapiApiToken}`
  })
  
  try { 
    const response = await fetch(`${stripiUri}${resourceUri}${config?.populate ? '?populate=*' : ''}`, {
      headers
    })
    
    if (HTTP_STATUS_OK.includes(response.status)) {
      const result: StrapiApiResponse<T> | RequestError = await response.json()
      return result
    }
  
    return { status: 500, message: 'Something went wrong' }
  } catch (e) {
    return { status: 500, message: getErrorMessage(e) }
  }
}
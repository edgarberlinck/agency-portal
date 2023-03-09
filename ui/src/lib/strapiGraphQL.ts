import { pageQuery } from '@/queries/page';
import { pagesQuery } from '@/queries/pages';
import seoQuery from '@/queries/seoConfig';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.STRAPI_URI_GRAPHQL
});

const token = process.env.STRAPI_API_ACCESS

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// @TODO: Refactor me!
type Resource = {
  seoConfig: string
  pages: string
  page: string
}

const resourceMapping: Resource = {
  seoConfig: seoQuery,
  pages: pagesQuery,
  page: pageQuery
}
////////

export async function queryResource<T>(resource: keyof Resource, variables?: { id: number }): Promise<T> {
  const query = resourceMapping[resource as keyof Resource]
  
  const { data } = await client.query({
    query: gql`${query}`,
    variables
  })

  return data[resource].data
}
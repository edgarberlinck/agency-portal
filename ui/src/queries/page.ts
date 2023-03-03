export const pageQuery = `
query page ($id: ID) {
  page(id: $id) {
    data {
      id,
      attributes {
        title
        slug
        defaultHomepage
        blocks {
        	__typename
          
          ... on ComponentComponentsHero {
            title
            description
            image {
              data {
                id
                attributes {
                  name
                  alternativeText
                  caption
                  formats
                }
              }
            }
          }

          ... on ComponentComponentsBlogPostList {
            title
            display
          }

        }
      }
    }
  }
}
`
export const pagesQuery = `
query {
  pages {
      data {
          id
          attributes {
              title
              slug
              defaultHomepage
          }
      }
  }
}
`
export const blogPostsQuery = `
query {
  blogPosts {
    data {
      id
    	attributes {
        title
        locale
        createdAt
      }  
    }
  }
}
`
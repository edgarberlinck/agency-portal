const seoQuery = `
query {
  seoConfig {
    data {
      attributes {
        title
        keywords
        description
      }
    }
  }
}`



export default seoQuery
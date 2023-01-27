export interface StrapiBlock {
  id: string
  __component: string
  // Define one or more component props, if any exists.
  [others: string]: any
}
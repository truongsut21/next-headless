import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($first: Int = 100) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        excerpt
        date
        uri
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;
import { gql } from "@apollo/client";

export const GET_POST_BY_SLUG = gql`
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
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
`;
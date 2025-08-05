import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
query GetBlog($slug: String!, $page: Int, $limit: Int) {
  getBlog(slug: $slug, page: $page, limit: $limit) {
    id
    title
    summary
    created_at
    image_url
    reference
    source
  }
}
`;
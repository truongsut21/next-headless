import client from "../lib/apolloClient";
import { gql } from "@apollo/client";

export default function Post({ post }) {
  if (!post) return <p>Không tìm thấy bài viết.</p>;

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      {
        posts(first: 50) {
          nodes {
            slug
          }
        }
      }
    `,
  });

  const paths = data.posts.nodes.map((p) => ({
    params: { slug: p.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          title
          content
        }
      }
    `,
    variables: { slug: params.slug },
  });

  return {
    props: { post: data.post || null },
    revalidate: 60,
  };
}
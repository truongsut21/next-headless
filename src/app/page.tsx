// app/page.tsx
import client from "../lib/apolloClient";
import { GET_POSTS } from "@/lib/queries/GET_POSTS";
import Image from "next/image";
import emptyJpg from "@public/image/empty.png";

type Post = {
  id: string;
  title: string;
  slug: string;
  uri: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
};

export default async function HomePage() {
  const { data } = await client.query<{
    posts: {
      nodes: Post[];
    };
  }>({
    query: GET_POSTS,
  });

  const posts = data?.posts?.nodes || [];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tin mới nhất</h1>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post: Post) => (
          <a key={post.id} href={post.uri} className="border rounded-lg p-3">
            <h2 className="font-semibold">{post.title}</h2>

            <Image
              src={post.featuredImage?.node?.sourceUrl || emptyJpg}
              alt={post.title}
              width={500}
              height={300}
            />
          </a>
        ))}
      </div>
    </main>
  );
}

export const revalidate = 60;

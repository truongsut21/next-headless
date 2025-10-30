// app/page.tsx
import { GET_POSTS } from "@/lib/queries/GET_POSTS";
import dynamic from "next/dynamic";
import client from "@/lib/apolloClient";
import type { Post } from "@/types/post";
import PostCard from "./components/PostCard";

// Dynamically import HeroBanner for better initial page load
const HeroBanner = dynamic(() => import("@/components/ui/HeroBanner"), {
  ssr: true, // Enable SSR since we want to pre-render the hero section
  loading: () => (
    <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
  ), // Loading placeholder
});

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
    <main className="p-8 container">
      {/* <HeroBanner posts={posts.slice(0, 5)} /> */}
      <h1 className="text-2xl font-bold mb-4">Tin mới nhất</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

export const revalidate = 60;

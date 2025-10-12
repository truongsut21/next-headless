// app/page.tsx
import { GET_POSTS } from "@/lib/queries/GET_POSTS";
import Image from "next/image";
import emptyJpg from "@public/image/empty.png";
import Link from "next/link";
import client from "@/lib/apolloClient";
import { Post } from "@/types/post";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import HeroBanner from "@/components/ui/HeroBanner";

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
      <HeroBanner posts={posts.slice(0, 5)} />
      <h1 className="text-2xl font-bold mb-4">Tin mới nhất</h1>
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: Post) => (
          <Link key={post.id} href={post.slug}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <Image
                  src={post.featuredImage?.node?.sourceUrl || emptyJpg}
                  alt={post.title}
                  width={500}
                  height={300}
                />
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                </CardContent>
                <CardAction>Xem thêm</CardAction>
              </CardHeader>

              <CardFooter>
                <p>
                  {post.categories?.nodes
                    .map((category) => category.name)
                    .join(", ")}
                </p>
                <p>{formatDate(post.date)}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}

export const revalidate = 60;

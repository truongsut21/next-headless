import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
      <Link href={post.slug}>
        <Image
          src={post.featuredImage?.node?.sourceUrl || '/image/empty.png'}
          alt={post.title || 'Post image'}
          width={800}
          height={300}
          className="w-full h-48 object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          <Link href={post.slug}>{post.title}</Link>
        </h2>
        <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      </div>
    </div>
  );
}
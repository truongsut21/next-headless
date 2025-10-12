import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
      <Link href={post.uri}>
        <img
          src={post.featuredImage?.node?.sourceUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          <Link href={post.uri}>{post.title}</Link>
        </h2>
        <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
      </div>
    </div>
  );
}
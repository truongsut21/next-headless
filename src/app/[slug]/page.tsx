import client from "../../lib/apolloClient";
import { GET_POST_BY_SLUG } from "@/lib/queries/GET_POST_BY_SLUG";
import { GET_POSTS } from "@/lib/queries/GET_POSTS";
import { slug } from "@/types/post";
import { Metadata } from "next";
import Image from "next/image";

type Post = {
  title: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
};

type Params = {
  params: {
    slug: string;
  };
};

// Tạo generateMetadata để SEO
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await client.query<{ post: Post }>({
    query: GET_POST_BY_SLUG,
    variables: { slug: slug },
  });

  const post = data?.post;

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
    };
  }

  return {
    title: post.title,
    description: post.content?.substring(0, 155).replace(/<[^>]*>/g, "") || "",
  };
}

// Tạo generateStaticParams để tạo các trang tĩnh
export async function generateStaticParams() {
  const { data } = await client.query<{
    posts: {
      nodes: slug[];
    };
  }>({
    query: GET_POSTS,
    variables: { first: 50 },
  });

  // Đảm bảo luôn trả về một mảng, không bao giờ trả về undefined
  return (data?.posts?.nodes || []).map((post) => ({
    slug: post.slug,
  }));
}

// Trang chi tiết bài viết
export default async function Post({ params }: Params) {
  const { slug } = await params;
  const { data } = await client.query<{ post: Post }>({
    query: GET_POST_BY_SLUG,
    variables: { slug: slug },
  });

  const post = data?.post;

  if (!post) {
    return <div className="p-8">Không tìm thấy bài viết.</div>;
  }

  const formattedDate = new Date(post.date).toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">{formattedDate}</div>

      {post.featuredImage?.node?.sourceUrl && (
        <div className="mb-6">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.title}
            width={800}
            height={500}
            className="rounded-lg w-full h-auto"
            priority
            fetchPriority="high"
          />
        </div>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.categories?.nodes && post.categories.nodes.length > 0 && (
        <div className="mt-6 flex gap-2">
          <span>Chuyên mục:</span>
          {post.categories.nodes.map((cat) => (
            <span
              key={cat.slug}
              className="bg-gray-100 px-2 py-1 rounded text-sm"
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

// Cấu hình tạo trang tĩnh với dynamic rendering
export const dynamicParams = true; // Cho phép tạo tham số động
export const revalidate = 60; // Tạo lại trang mỗi 60 giây nếu có yêu cầu

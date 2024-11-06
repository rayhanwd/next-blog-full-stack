import prisma from "@/lib/prisma";
import Link from "next/link";

async function getPost(id) {
  return await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.content?.slice(0, 150) || "Read this blog post.",
    openGraph: {
      title: post.title,
      description: post.content?.slice(0, 150) || "Read this blog post.",
      url: `https://yourwebsite.com/posts/${id}`,
      type: "article",
      images: [
        {
          url: post.image || "https://yourwebsite.com/default-image.jpg",
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content?.slice(0, 150) || "Read this blog post.",
      images: [post.image || "https://yourwebsite.com/default-image.jpg"],
    },
  };
}

export default async function PostPage({ params }) {
  const { id } = params;
  const post = await getPost(id);

  if (!post) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <Link href="/" className="text-blue-600 mt-4 block">
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-6">
          {post.published ? "Published" : "Draft"}
        </div>
        <p className="text-gray-800 mb-6">{post.content || "No content available."}</p>
        {post.author && (
          <div className="border-t border-gray-300 pt-4 mt-6">
            <h3 className="text-lg font-semibold">Author</h3>
            <p className="text-gray-700">{post.author.name}</p>
            <p className="text-gray-500 text-sm">{post.author.email}</p>
          </div>
        )}
        <Link href="/" className="inline-block mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Back to Posts
        </Link>
      </div>
    </div>
  );
}

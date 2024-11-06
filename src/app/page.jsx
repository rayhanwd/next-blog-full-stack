import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10;

async function fetchPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return posts;
}
export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Image width={200} height={200} src={"https://via.placeholder.com/600x400"} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content.slice(0, 100)}...</p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <p>{post.author.name}</p>
              </div>
              <Link href={`/post/${post.id}`} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { GetPosts } from "@/services";
import { TPost } from "@/types/services";
import Link from "next/link";

export default function Posts() {
  const { data: posts, isLoading, isError, error, isFetching } = GetPosts();

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading posts: {error?.message || "Unknown error"}</p>
        </div>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No posts found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post: TPost) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>
            <Link href={`/posts/${post.id}`}>
              <button className="btn btn-primary btn-sm">Read More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

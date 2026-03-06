"use client";

import { GetPostById } from "@/services";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SinglePost() {
  const { id } = useParams();
  const postId =
    typeof id === "string"
      ? parseInt(id, 10)
      : Array.isArray(id)
      ? parseInt(id[0], 10)
      : 0;

  const { data: post, isLoading, isError, error, isFetching } = GetPostById(postId);

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
          <p>Error loading post: {error?.message || "Unknown error"}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/posts">
          <button className="btn btn-outline-primary">← Back to Posts</button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-2 text-sm text-gray-500">
          Post ID: {post.id} • User ID: {post.userId}
        </div>
        <div className="border-t pt-4 mt-4">
          <p className="text-gray-700 whitespace-pre-line">{post.body}</p>
        </div>
      </div>
    </div>
  );
}

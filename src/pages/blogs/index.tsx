import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface BlogTree {
  path: string;
  mode: string;
  type: string;
  sha: string;
  url: string;
  size: number;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        const filteredData = data
          .filter((blog: BlogTree) => blog.type === "blob")
          .filter(
            (blog: BlogTree) =>
              !blog.path.includes("lib") && !blog.path.includes(".vscode")
          );
        const modifiedData = filteredData
          .sort((a: BlogTree, b: BlogTree) => {
            return b.size - a.size;
          })
          .map((blog: BlogTree) => ({
            id: blog.url.split("/")[blog.url.split("/").length - 1],
            name: blog.path.replace("/", " -> ").replace(".md", ""),
          }));
        setBlogs(modifiedData);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-300"></div>
      </div>
    );

  if (!blogs.length)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center p-8 border border-teal-300 rounded-lg bg-slate-800/50">
          <h2 className="text-xl font-semibold text-teal-300">
            No blogs found
          </h2>
          <p className="text-slate-300 mt-2">
            Check back later for new content
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-300 to-cyan-400 bg-clip-text text-transparent">
          My Blog Collection
        </h1>
        <p className="text-slate-300 mt-2">
          Thoughts, tutorials, and insights from my journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-800/40 border border-slate-700 hover:border-teal-300 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-teal-900/20 hover:shadow-lg"
          >
            <div className="p-6">
              <h2 className="text-xl uppercase font-semibold text-teal-300 mb-2 line-clamp-2">
                {blog.name}
              </h2>
              <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-400 truncate max-w-[180px]">
                  {blog.id.substring(0, 12)}...
                </span>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 rounded-md transition-colors duration-300 text-sm font-medium"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

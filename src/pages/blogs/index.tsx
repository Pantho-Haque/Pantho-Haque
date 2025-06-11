import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MediaLinks } from "@/components";
import Image from "next/image";

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
  const [searchedBlogs, setSearchedBlogs] = useState<
    { id: string; name: string }[]
  >([]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
        setSearchedBlogs(modifiedData);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchUserInfo() {
      try {
        const response = await fetch("/api/user_info");
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    }

    fetchBlogs();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchedBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedBlogs(filtered);
    }
  }, [searchTerm, blogs]);

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
        className="mb-10 rounded-xl bg-slate-800/30 border border-t-0 border-slate-700 shadow-lg backdrop-blur-sm"
      >
        <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200 bg-clip-text text-transparent">
              My Blog Collection
            </h1>
            <p className="text-slate-300 mt-3 max-w-lg">
              Thoughts, tutorials, and insights from my journey
            </p>
          </div>
          <div className="flex flex-row md:flex-col items-center gap-4 p-4 rounded-lg">
            <Image
              src={userInfo.avatar_url}
              alt="User Avatar"
              width={60}
              height={60}
              className="rounded-full border-2 border-teal-300 shadow-md shadow-teal-500/20"
            />
            <div className="flex flex-col md:flex-row gap-3 mt-2">
              <p className="text-xs font-medium bg-slate-800 px-3 py-1 rounded-full text-teal-300 border border-slate-700">Repos: {userInfo.public_repos}</p>
              <p className="text-xs font-medium bg-slate-800 px-3 py-1 rounded-full text-teal-300 border border-slate-700">Followers: {userInfo.followers}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-800/40 border border-slate-700 focus:border-teal-300 focus:outline-none text-slate-200 placeholder-slate-400"
          />
          <svg
            className="absolute right-3 top-3.5 h-5 w-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {searchedBlogs.length === 0 ? (
        <div className="text-center p-8 border border-teal-300 rounded-lg bg-slate-800/50">
          <h2 className="text-xl font-semibold text-teal-300">
            No matching blogs found
          </h2>
          <p className="text-slate-300 mt-2">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedBlogs.map((blog, index) => (
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
      )}
    </div>
  );
}
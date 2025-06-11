import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { marked } from "marked";
import { motion } from "framer-motion";
import Link from "next/link";
import { OnThisPage } from "@/components";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [blogData, setBlogData] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState<{id: string, text: string, level: number}[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  useEffect(() => {
    if (contentRef.current && blogData) {
      const elements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const extractedHeadings = Array.from(elements).map((el, index) => {
        const id = `heading-${index}`;
        el.id = id;
        return {
          id,
          text: el.textContent || '',
          level: parseInt(el.tagName.substring(1))
        };
      });
      setHeadings(extractedHeadings);
    }
  }, [blogData, loading]);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-300"></div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center p-8 border border-red-300 rounded-lg bg-slate-800/50">
          <h2 className="text-xl font-semibold text-red-300">Blog not found</h2>
          <p className="text-slate-300 mt-2">The requested blog could not be found</p>
          <Link href="/blogs">
            <button className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded transition-colors">
              Return to Blogs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <Link href="/blogs">
        <button className="hidden lg:flex ml-36 mb-5 items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg transition-colors shadow-md border border-slate-600 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="text-teal-300">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className="font-medium">Back to Blogs</span>
        </button>
        <button className="lg:hidden flex items-center gap-1 px-3 py-1.5 mb-5 bg-slate-800/80 hover:bg-slate-700 text-sm text-white rounded-lg transition-colors shadow-md border border-slate-600 backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" className="text-teal-300">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </Link>
      
      {headings.length > 0 && (
        <OnThisPage headings={headings} />
      )}

      <div className="lg:w-3/4 mx-auto bg-slate-800/30 p-6 rounded-lg shadow-lg border border-slate-700">
        <div
          ref={contentRef}
          className="markdown-body prose prose-invert prose-headings:text-teal-300 prose-a:text-blue-400 prose-strong:text-white max-w-none"
          dangerouslySetInnerHTML={{
            __html: marked.parse(atob(blogData), {
              renderer: new marked.Renderer(),
              gfm: true,
              breaks: true,
              pedantic: false,
            }),
          }}
        />
      </div>
    </motion.div>
  );
}
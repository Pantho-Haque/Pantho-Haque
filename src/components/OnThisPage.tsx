interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function OnThisPage({ headings }: { headings: Heading[] }) {
  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed right-4 top-40 z-20 lg:hidden bg-slate-800 text-teal-300 p-3 rounded-full shadow-lg border-2 border-teal-600 hover:bg-slate-700 transition-colors duration-300"
        onClick={() => {
          const tocElement = document.getElementById("mobile-toc");
          if (tocElement) {
            tocElement.classList.toggle("translate-x-full");
            tocElement.classList.toggle("translate-x-0");
          }
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          fill="currentColor" 
          viewBox="0 0 16 12"
        >
          <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </button>

      {/* Mobile TOC - hidden by default, slides in when toggled */}
      <div
        id="mobile-toc"
        className="fixed right-0 top-0 bottom-0 w-72 bg-slate-800 shadow-xl z-30 transform translate-x-full transition-transform duration-300 lg:hidden overflow-y-auto"
      >
        <div className="p-4 border-b border-teal-600/30">
          <div className="flex justify-between items-center">
            <h3 className="text-teal-300 font-bold">Table of Contents</h3>
            <button
              className="text-slate-400 hover:text-white"
              onClick={() => {
                document
                  .getElementById("mobile-toc")
                  ?.classList.toggle("translate-x-full");
                document
                  .getElementById("mobile-toc")
                  ?.classList.toggle("translate-x-0");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className="cursor-pointer hover:text-teal-300 transition-colors"
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                onClick={() => {
                  scrollToHeading(heading.id);
                  document
                    .getElementById("mobile-toc")
                    ?.classList.add("translate-x-full");
                  document
                    .getElementById("mobile-toc")
                    ?.classList.remove("translate-x-0");
                }}
              >
                <span className="text-sm">{heading.text}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop TOC - always visible on large screens */}
      <div className="fixed right-8 top-24 w-auto bg-slate-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-teal-600/30 hidden lg:block">
        <h3 className="text-teal-300 font-bold mb-2 pb-2 border-b border-teal-600/30">
          Table of Contents
        </h3>
        <nav className="max-h-[60vh] overflow-y-auto pr-2">
          <ul className="space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className="cursor-pointer hover:text-teal-300 transition-colors"
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                onClick={() => scrollToHeading(heading.id)}
              >
                <span className="text-sm">{heading.text}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

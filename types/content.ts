/* The content contract shared by Domino (writes it) and the portfolio (reads it).
   Source of truth lives here in Domino; `pnpm content:types` copies it to ../Pantho-Haque/types/content.ts.
   Change it only together with types/content.schema.ts and bump schemaVersion for breaking changes. */

export type Img = {
  url: string;
  alt: string;
  w: number;
  h: number;
  blur?: string; // tiny data URL used as a blur placeholder
};

export type GalleryImg = Img & { caption?: string };

export type LinkIcon = "github" | "linkedin" | "mail" | "phone" | "web";

export type Profile = {
  name: string;
  headline: string; // "Software Engineer · Frontend & Platform at Pathao"
  proof: string; // one sentence with a number; **bold** marks the key phrase
  summary: string;
  location: string;
  timezone: string;
  available: boolean;
  email: string;
  phone?: string;
  resumeUrl: string;
  links: { label: string; url: string; icon: LinkIcon }[];
  photo?: Img;
  cover?: Img;
  /** Where the tracking box locks on the cover, in % of the image: left, top, width, height. */
  coverFocus: { x: number; y: number; w: number; h: number };
};

type SectionBase = {
  id: string; // stable, url-safe; used as the anchor (#lv-<id>)
  title: string;
  nav: string; // short name in the level map
  intro?: string;
  hidden: boolean;
  onResume: boolean;
};

export type TimelineItem = {
  title: string;
  org: string;
  url?: string;
  start: string; // display text, e.g. "Jan 2025"
  end?: string; // empty = present
  summary?: string;
  highlights: string[]; // **bold** allowed
  tags: string[];
};

export type Section = SectionBase &
  (
    | { type: "timeline"; items: TimelineItem[] }
    | { type: "projects"; show: "featured" | "all" }
    | { type: "skills"; groups: { name: string; items: string[] }[] }
    | { type: "achievements"; items: { title: string; issuer?: string; date?: string; url?: string }[] }
    | { type: "stats"; items: { value: string; label: string }[] }
    | { type: "links"; items: { title: string; topic: string; url: string }[] }
    | { type: "text"; body: string }
    | { type: "gallery"; images: GalleryImg[] }
    | { type: "quotes"; items: { quote: string; name: string; role: string }[] }
  );

export type SectionType = Section["type"];

export type Project = {
  slug: string; // url: /work/<slug>
  name: string;
  tagline: string;
  featured: boolean; // featured = case file with its own page
  role: string;
  period: string;
  team?: string;
  status: string; // "Live" | "Internal" | "Archived" | free text
  stack: string[];
  links: { live?: string; code?: string };
  cover?: Img;
  gallery: GalleryImg[];
  metrics: { value: string; label: string }[];
  problem: string;
  approach: string;
  outcome: string;
};

export type Content = {
  schemaVersion: 3;
  profile: Profile;
  sections: Section[]; // page order = level order
  projects: Project[]; // array order = display order
  seo: { title: string; description: string };
  /** Filled in by getContent() from the database row; not stored. */
  meta?: { version: number; publishedAt: string };
};

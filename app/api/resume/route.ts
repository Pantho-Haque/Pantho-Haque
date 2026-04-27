import data from "@/resume.json";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // const detailed_desc_html = `
    // <div class='font-mono text-sm leading-relaxed'>
    //   <div class='mb-4 border-l-2 border-gray-300 pl-4 border-t' style='padding-top: 4px;'>
    //     <div class='text-xs font-semibold tracking-widest text-gray-400 mb-1'>FRONTEND ARCHITECTURE</div>
    //     <div class='text-xs'>Architected <strong>12+ production dashboards</strong> using React — <strong>70+ pages</strong>, reusable components, configuration-driven UIs. Impact: <strong>reduced feature dev time by ~30%</strong>.</div>
    //   </div>
    //   <div class='mb-4 border-l-2 border-gray-300 pl-4 border-t' style='padding-top: 4px;'>
    //     <div class='text-xs font-semibold tracking-widest text-gray-400 mb-1'>STATE MANAGEMENT & PERFORMANCE</div>
    //     <div class='text-xs'>Optimized complex state (hooks, context) and resolved critical UI bottlenecks — <strong>~40% improvement in responsiveness</strong> for high-volume users. Minimized re-renders across real-time dashboards.</div>
    //   </div>
    //   <div class='mb-4 border-l-2 border-gray-300 pl-4 border-t' style='padding-top: 4px;'>
    //     <div class='text-xs font-semibold tracking-widest text-gray-400 mb-1'>PRODUCT & FEATURE DELIVERY</div>
    //     <div class='text-xs'>Shipped <strong>surge pricing, zonal promotions, lifecycle tools</strong> powering logistics & rides. Built real-time microservice for parcel data — supporting <strong>millions of daily transactions</strong>.</div>
    //   </div>
    //   <div class='mb-4 border-l-2 border-gray-300 pl-4 border-t' style='padding-top: 4px;'>
    //     <div class='text-xs font-semibold tracking-widest text-gray-400 mb-1'>UX & LOCALIZATION</div>
    //     <div class='text-xs'>Redesigned workflows reducing operational errors. Shipped <strong>multi-language support (BN/EN/NP)</strong> — expanding accessibility across <strong>3 regions</strong>.</div>
    //   </div>
    //   <div class='mb-4 border-l-2 border-gray-300 pl-4 border-t' style='padding-top: 4px;'>
    //     <div class='text-xs font-semibold tracking-widest text-gray-400 mb-1'>DEVOPS & RELIABILITY</div>
    //     <div class='text-xs'>Containerized with Docker, strengthened CI/CD pipelines — <strong>reduced deployment friction</strong>. Led production deployments, resolved critical perf issues impacting <strong>millions of users</strong>.</div>
    //   </div>
    //   <div class='border-l-2 border-gray-300 pl-4 border-t' style='padding-top: 4px;'>
    //     <div class='text-xs font-semibold tracking-widest text-gray-400 mb-1'>KNOWLEDGE & DEVELOPER EXPERIENCE</div>
    //     <div class='text-xs'>Built engineering Knowledge base (CI/CD, Kubernetes, Helm). Created reusable CI templates — <strong>standardized workflows</strong> for team.</div>
    //   </div>
    // </div>`;
    // data.experience[0].detailed_desc_html = detailed_desc_html;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

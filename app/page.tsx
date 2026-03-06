"use client";
import { FormComponent, LocaleSwitcherSelect } from "@/components";
import { useNotification } from "@/hooks";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/public/assets/images";
export default function Home() {
  const t = useTranslations();
  // const { info, success, error, notify } = useNotification();
  const { info } = useNotification();





  return (
    <div className="container mx-auto px-4 py-8">
      <LocaleSwitcherSelect />
      <h1 className="text-3xl font-bold mb-6">Tailwind Components Demo</h1>

      {/* Posts Link Button */}
      <section className="mb-8">
        <Link href="/posts">
          <button className="btn btn-primary">View All Posts</button>
        </Link>
      </section>

      {/* Button Components */}
      <section className="mb-8">
        <p>{t("hello")}</p>
        <h2 className="text-2xl font-semibold mb-4">Button Components</h2>
        <div className="flex flex-wrap gap-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              info({
                title: "info",
                desc: "hi there i am info notification changes will make your notifications appear and disappear with a smoother, more professional-looking transition.",
                position: "top-right",
              });
            }}
          >
            Primary Button
          </button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-success">Success Button</button>
          <button className="btn btn-danger">Danger Button</button>
          <button className="btn btn-primary btn-sm">Small Button</button>
          <button className="btn btn-outline-primary">Outline Button</button>
        </div>
      </section>
      <Image src={IMAGES.Spinner} alt="Spinner" width={100} height={100} />
      {/* Card Components */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Card Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Basic Card</h3>
              <p className="card-subtitle">Card subtitle</p>
            </div>
            <div className="card-body">
              <p>This is a basic card component created with Tailwind CSS.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>

          <div className="card card-primary card-hover">
            <div className="card-header">
              <h3 className="card-title">Primary Card</h3>
              <p className="card-subtitle">With hover effect</p>
            </div>
            <div className="card-body">
              <p>This card has a primary style and hover effect.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-outline-primary">View Details</button>
            </div>
          </div>

          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Success Card</h3>
            </div>
            <div className="card-body">
              <p>This is a success variant of the card component.</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-success">Confirm</button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Components */}
      <FormComponent />
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import { useLocale, useTranslations } from "next-intl";
import { LOCALES } from "@/constants";

export default function LocaleSwitcherSelect() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  const items = [
    {
      value: LOCALES.ENGLISH,
      label: t("en"),
    },
    {
      value: LOCALES.BANGLA,
      label: t("bn"),
    },
  ];

  function onChange(value: Locale) {
    const locale = value as Locale;
    setUserLocale(locale);
    setIsOpen(false);
  }

  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        setHeight(`${dropdownRef.current.scrollHeight}px`);
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen]);

  return (
    <div className="flex items-center relative">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-expanded={isOpen}
      >
        <i
          className={`icon-ic_language text-base  ${isOpen ? "text-red-500" : ""}`}
        ></i> 
        <span
          className={`text-base transition-colors duration-200 ${
            isOpen ? "text-red-500" : ""
          }`}
        >
          {items.find((item) => item.value === locale)?.label || locale}
        </span>
        <i
          className={`icon-ic_chevron_down text-base ${
            isOpen ? "rotate-180 text-red-500" : ""
          }`}
        ></i>
      </div>
      <div
        className={`absolute top-[30px] md:top-14 left-0 md:left-[-82px] min-w-[160px] z-10 bg-white shadow-md rounded-b overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ height }}
        ref={dropdownRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="px-6 py-3" role="menu" aria-orientation="vertical">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className={`block w-full text-left py-1.5 text-sm transition-all duration-200 ease-in-out cursor-pointer ${
                locale === item.value ? "font-medium" : "hover:ml-1"
              }`}
              role="menuitem"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

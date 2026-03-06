import { LOCALES } from "@/constants";

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const locales = Object.values(LOCALES);
export const defaultLocale: Locale = LOCALES.BANGLA;
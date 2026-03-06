import { NextIntlClientProvider } from "next-intl";
import { NotificationProvider } from "./notifyContext";
import ClientProviders from "./ClientProviders";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <NextIntlClientProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </NextIntlClientProvider>
    </ClientProviders>
  );
}

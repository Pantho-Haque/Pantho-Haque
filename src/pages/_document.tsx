/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from "next/document";
import { useEffect } from "react";

export default function Document() {
  useEffect(() => {
    document.title = "Pantho Haque | Portfolio";
  }, []);
  return (
    <Html lang="en">
      <Head>
        <title>{document.title}</title>
        <link rel="shortcut apple-touch-icon" sizes="180x180" href="/Pantho-Haque/apple-touch-icon.png"/>
        <link rel='shortcut icon' type="image/png" sizes="32x32" href="/Pantho-Haque/favicon-32x32.png"/>
        <link rel='shortcut icon' type="image/png" sizes="16x16" href="/Pantho-Haque/favicon-16x16.png"/>
        <link rel="shortcut icon" href="/Pantho-Haque/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

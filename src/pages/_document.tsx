/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Pantho Haque</title>
        
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

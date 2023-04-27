/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Pantho Haque</title>
        
        <link rel="shortcut apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel='shortcut icon' type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel='shortcut icon' type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest"/>

        <script src="https://cdn.jsdelivr.net/npm/kutty@latest/dist/kutty.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/kutty@latest/dist/alpinejs.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/kutty@latest/dist/dropdown.min.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Enable View Transitions API */}
      <meta name="view-transition" content="same-origin" />

      {/* Tailwind v3 CSS file */}
      <link href={asset("/styles.css")} rel="stylesheet" />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />

      <script
        type="text/javascript"
        id=""
        async
        src="https://cdn.widde.io/widde.1.1.0.js?v=1.0"
      />
    </Head>
  );
}

export default GlobalTags;

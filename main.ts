import { start } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@1.22.0/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";
import manifest from "./fresh.gen.ts";
import decoManifest from "./manifest.gen.ts";

await start(manifest, {
  plugins: [
    ...plugins({
      manifest: decoManifest,
    }),
    partytownPlugin(),
  ],
});

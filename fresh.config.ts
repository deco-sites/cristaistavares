import { defineConfig } from "$fresh/src/server/defines.ts";
import plugins from "deco-sites/std/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";
import decoManifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: [
    ...plugins({
      manifest: decoManifest,
      // deno-lint-ignore no-explicit-any
      tailwind: tailwind as any,
    }),
    partytownPlugin(),
  ],
  render: (ctx, render) => {
    ctx.lang = "pt-BR";
    render();
  },
});

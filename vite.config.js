// Consult https://vitejs.dev/config/ to learn about these options
import { join, resolve } from "path";
import { readFileSync } from "fs";
import { cwd } from "process";

const pkg = JSON.parse(readFileSync(join(cwd(), "package.json")));

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      $stores: resolve("src/stores"),
      $utils: resolve("src/utils"),
      $gql: resolve("src/gql"),
    },
  },
  ssr: {
    noExternal: Object.keys(pkg.dependencies || {}),
  },
  optimizeDeps: {
    exclude: ["@urql/svelte"],
  },
};

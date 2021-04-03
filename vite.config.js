// Consult https://vitejs.dev/config/ to learn about these options
import { join, resolve } from "path";
import { readFileSync } from "fs";
import { cwd } from "process";

const pkg = JSON.parse(readFileSync(join(cwd(), "package.json")));
const { dayjs = "", ...deps } = pkg.dependencies;

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
    noExternal: Object.keys(deps || {}),
  },
  optimizeDeps: {
    exclude: ["@urql/svelte"],
  },
  build: {
    target: "esnext", // maximum minification
  },
};

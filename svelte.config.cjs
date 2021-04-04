const static = require("@sveltejs/adapter-static");
const sveltePreprocess = require("svelte-preprocess");
const { resolve } = require("path");
const pkg = require("./package.json");

const production = process.env.NODE_ENV == "production";
!production && // log DB API link
  setTimeout(() => {
    const msg =
      "\nView GraphQL Playground to explore your site's data and schema\n\n  ";
    const link = "https://dashboard.fauna.com/graphql/@db/DShift";
    console.log(msg, "\x1b[35m\x1b[47m", link, "\x1b[0m", "\n");
  }, 0);

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  kit: {
    // By default, `npm run build` will create a standard Netlify app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: static(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
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
      build: {
        target: "esnext", // maximum minification
      },
    },
  },
  preprocess: [
    sveltePreprocess({
      postcss: true,
      defaults: { style: "postcss" },
    }),
  ],
};

const sveltePreprocess = require("svelte-preprocess");

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
  preprocess: [
    sveltePreprocess({
      postcss: true,
      defaults: { style: "postcss" },
    }),
  ],
  kit: {
    // By default, `npm run build` will create a standard Node app.
    // You can create optimized builds for different platforms by
    // specifying a different adapter
    adapter: "@sveltejs/adapter-netlify",

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
};

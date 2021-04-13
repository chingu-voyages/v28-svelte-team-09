const tw = require("@tailwindcss/jit");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
  plugins: [
    tw,
    autoprefixer,
    !dev &&
      cssnano({
        preset: "default",
      }),
  ],
};

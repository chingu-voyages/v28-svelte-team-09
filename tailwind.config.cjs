module.exports = {
  purge: {
    content: ["./src/**/*.html", "./src/**/*.svelte"],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  theme: {
    fontFamily: {
      logo: "Pacifico",
      main: "Quicksand, sans-serif",
    },
    extend: {
      colors: {
        yellow: {
          DEFAULT: "#FDCA5C",
          100: "#E3A56C",
        },
        mint: {
          DEFAULT: "#4AE789",
        },
      },
    },
  },
};

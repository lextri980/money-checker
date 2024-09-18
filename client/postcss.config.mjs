/** @type {import('postcss-load-config').Config} */
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcss from "postcss";

const config = {
  syntax: postcss,
  plugins: [
    'postcss-import',
    tailwindcss,
    autoprefixer,
  ],
};

export default config;

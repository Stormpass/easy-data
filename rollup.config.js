// rollup.config.js
import { terser } from "rollup-plugin-terser";
export default {
  input: 'index.js',
  plugins: [terser()],
  output: {
    file: 'dist/easy-data.js',
    format: 'cjs'
  }
};
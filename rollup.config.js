import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

module.exports = {
  input: "src/index.js",
  // name: "Validate",
  external: id => /ramda/.test(id),
  output: [
    {
      file: "lib/index.js",
      format: "cjs"
    }
  ],
  plugins: [resolve(), commonjs()]
};

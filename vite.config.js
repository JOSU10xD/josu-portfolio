import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to a local empty module that fakes the optional Expo/RN modules
// declared as optional peer deps by @react-three/fiber. We never need them
// in a web build, but Vite/esbuild still tries to resolve them during the
// dependency scan.
const emptyModule = path.resolve(__dirname, "src/lib/empty-module.js");

// https://vite.dev/config/
export default defineConfig({
  base: "/josu-portfolio/", // <-- GH Pages base path
  plugins: [react(), tailwindcss()],

  // Pass an empty tsconfig to esbuild so it never tries to walk up the
  // directory tree and pick up sibling Expo projects' tsconfig.json
  // (which extends "expo/tsconfig.base"). We use `tsconfigRaw` because it
  // is accepted by both `build()` and `transform()`; a string `tsconfig`
  // path is only valid in `build()` and breaks the build step.
  esbuild: {
    tsconfigRaw: "{}",
  },
  optimizeDeps: {
    esbuildOptions: {
      tsconfigRaw: "{}",
    },
    // Don't try to pre-bundle the optional Expo modules — they are never
    // imported in the web build path.
    exclude: [
      "expo",
      "expo-gl",
      "expo-asset",
      "expo-file-system",
      "expo-modules-core",
      "react-native",
      "scheduler/cjs/scheduler.native.js",
    ],
  },

  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      // Redirect the optional Expo/RN modules to a local empty stub so
      // Vite never tries to resolve their source files.
      { find: /^expo-gl$/, replacement: emptyModule },
      { find: /^expo-asset$/, replacement: emptyModule },
      { find: /^expo-file-system$/, replacement: emptyModule },
      { find: /^expo-modules-core$/, replacement: emptyModule },
      { find: /^react-native$/, replacement: emptyModule },
    ],
    dedupe: [
      "react",
      "react-dom",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
});

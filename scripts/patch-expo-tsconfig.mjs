// scripts/patch-expo-tsconfig.mjs
//
// Why this exists:
// Vite/esbuild's dependency optimizer walks `tsconfig.json` files it encounters
// during scan. The `@react-three/fiber` package declares an *optional* peer
// dependency on `expo-gl` / `expo-asset` / `expo` and Vite's optimizer
// occasionally resolves into a code path whose source file's nearest
// `tsconfig.json` (often a sibling Expo project in a parent directory) extends
// "expo/tsconfig.base". When that base is not installed, esbuild prints:
//
//   Cannot find base config file "expo/tsconfig.base"
//
// We don't ship the optional Expo modules (this is a web-only portfolio), so
// the cleanest fix is to provide a local stub at `node_modules/expo/` with a
// `package.json` and `tsconfig.base.json` so the `extends` lookup succeeds.
// This script re-creates the stub after every `npm install`.

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");
const expoDir = join(projectRoot, "node_modules", "expo");
const pkgPath = join(expoDir, "package.json");
const stubPath = join(expoDir, "tsconfig.base.json");

if (!existsSync(expoDir)) {
  mkdirSync(expoDir, { recursive: true });
}

const pkg = `{
  "name": "expo",
  "version": "0.0.0-stub",
  "main": "tsconfig.base.json",
  "private": true,
  "description": "Local stub for the optional expo peer dep declared by @react-three/fiber. Satisfies 'extends: expo/tsconfig.base' lookups during Vite/esbuild dep optimization. Not a real package."
}
`;

const stub = `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  }
}
`;

writeFileSync(pkgPath, pkg, "utf8");
writeFileSync(stubPath, stub, "utf8");
console.log("[patch-expo-tsconfig] wrote", pkgPath, "+", stubPath);

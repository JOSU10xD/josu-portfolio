// src/lib/empty-module.js
// Empty ESM module used as an alias target for optional React Native / Expo
// modules that @react-three/fiber declares as peer dependencies. We don't
// ship a React Native build, so these are simply stubbed out.
export default {};
export const Canvas = () => null;

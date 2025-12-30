/** @type {import('jest').Config} */
module.exports = {
  rootDir: ".", // ensure paths are relative to root
  testEnvironment: "jsdom", // Needed for React DOM tests

  testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],

  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { isolatedModules: true }],
  },

  moduleFileExtensions: ["ts", "tsx", "js", "json"],

  // Transform ESM modules like Ant Design
  transformIgnorePatterns: ["/node_modules/(?!(antd)/)"],

  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/", "/.next/"],

  cacheDirectory: ".jest-cache",
};

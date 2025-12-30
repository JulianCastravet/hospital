/** @type {import('jest').Config} */
module.exports = {
  projects: [
    "<rootDir>/server/jest.config.cjs",
    "<rootDir>/jest.frontend.config.js",
  ],
  watchman: false,
  maxWorkers: 1,
  cacheDirectory: ".jest-cache",
};

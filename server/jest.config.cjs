/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest/presets/default", // for Node + TS
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  extensionsToTreatAsEsm: [], // keep empty for Node backend
};

/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from "jest";

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The root directory that Jest should scan for tests and modules within
  rootDir: ".",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "./**/*.tests.ts"
  ],
  preset: "ts-jest",
  testTimeout: 5000,
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
};

export default config;

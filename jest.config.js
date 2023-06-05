// module.exports = {
//   collectCoverage: true,
//   coverageReporters: ["lcov", "text"],
// };
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true
    }
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|query-string)"  // Add the 'query-string' here
  ]
};


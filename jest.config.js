module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  modulePathIgnorePatterns: [
    "/src/server/",
    "/src/modules/[a-z]+-?[a-z]+/[a-z]+-?[a-z]+.module.ts",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.ts$",
};

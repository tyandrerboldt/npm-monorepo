export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.spec.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
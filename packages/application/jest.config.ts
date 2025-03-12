export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/*.spec.ts"],
  moduleNameMapper: {
    "^@repo/domain/(.*)$": "<rootDir>/../domain/src/$1",
    "^@repo/dtos/(.*)$": "<rootDir>/../dtos/src/$1"
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
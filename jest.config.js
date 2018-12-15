
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "setupTestFrameworkScriptFile": "<rootDir>/lib/db-jest.js",
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/lib/**"
  ]
}
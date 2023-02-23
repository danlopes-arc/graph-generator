/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "prettier"
  ],
  rules: {},
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: {}
    }
  ]
}
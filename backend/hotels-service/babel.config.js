module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@root": "./dist",
          "@directives": "./dist/directives",
          "@helpers": "./dist/helpers",
          "@models": "./dist/models",
          "@schemas": "./dist/schemas"
        }
      }
    ]
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ]
  ]
}
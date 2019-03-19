module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  env: {
    production: {
      presets: [
        "babel-preset-minify"
      ]
    }
  }
}

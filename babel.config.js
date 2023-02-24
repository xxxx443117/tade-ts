module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "babel-plugin-inline-import",
        {
          "extensions": [".svg"]
        }
      ],
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            "~": "./",
          },
        },
      ],
    ],
  };
};

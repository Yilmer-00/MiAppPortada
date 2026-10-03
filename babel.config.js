module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // ... otros plugins si los tienes (como nativewind)
      'react-native-reanimated/plugin',
    ],
  };
};
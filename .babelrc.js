module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current'
        },
        modules: 'commonjs'
      }
    ],
    '@babel/preset-typescript'
  ]
};

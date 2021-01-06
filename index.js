module.exports = {
  presets: [
    require.resolve('@babel/preset-react'),
    [
      require.resolve('@babel/preset-env'),
      {
        loose: true,
        useBuiltIns: false,
        targets: {
          node: '4',
          esmodules: true,
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      {loose: true}
    ]
  ]
 }

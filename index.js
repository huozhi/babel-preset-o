const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

module.exports = () => {
  return {
    presets: [
      require("@babel/preset-react").default,
      [
        require("@babel/preset-env").default,
        {
          loose: true,
          useBuiltIns: isDev && 'usage',
          targets: {
            node: 'current',
            esmodules: true,
          },
        },
      ],
    ],
    plugins: [
      [
        require("@babel/plugin-proposal-class-properties").default,
        { loose: true },
      ],
      [
        require("@babel/plugin-proposal-optional-chaining").default,
        { loose: true },
      ],
      [
        require('@babel/plugin-transform-runtime').default,
        {
          regenerator: true,
          version: require('@babel/runtime/package.json').version,
          absoluteRuntime: path.dirname(
            require.resolve('@babel/runtime/package.json')
          ),
        }
      ]
    ],
  };
};

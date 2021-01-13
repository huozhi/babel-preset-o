const path = require('path')

module.exports = (api, options = {}) => {
  const nodeEnv = process.env.NODE_ENV
  const isDev = nodeEnv === 'development'

  let absoluteRuntime = null
  try {
    absoluteRuntime = path.dirname(
      require.resolve('@babel/runtime/package.json')
    )
  } catch (_) {}

  const {
    nodeVersion = 'current',
    modules = false,
    useBuiltIns = false,
  } = options

  return {
    presets: [
      require("@babel/preset-react").default,
      [
        require("@babel/preset-env").default,
        {
          loose: true,
          corejs: useBuiltIns ? 3 : false,
          modules,
          useBuiltIns,
          targets: {
            node: nodeVersion,
          },
          exclude: ['@babel/plugin-transform-typeof-symbol'],
        },
      ],
    ],
    plugins: [
      [
        require("@babel/plugin-proposal-class-properties").default,
        { loose: true },
      ],
      isDev && [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: false,
          helpers: isDev,
          regenerator: true,
          useESModules: false,
          version: require('@babel/runtime/package.json').version,
          absoluteRuntime,
        }
      ],
      [
        require("@babel/plugin-proposal-optional-chaining").default,
        { loose: true },
      ],
      [
        require("@babel/plugin-proposal-nullish-coalescing-operator").default,
        { loose: true },
      ]
    ].filter(Boolean),
  };
};

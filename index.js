const path = require('path')

module.exports = (api, options = {}) => {
  const nodeEnv = process.env.NODE_ENV
  const isTest = nodeEnv === 'test'
  const isDev = nodeEnv === 'development'
  const isProd = nodeEnv === 'production'

  let absoluteRuntime = null
  try {
    absoluteRuntime = path.dirname(
      require.resolve('@babel/runtime/package.json')
    )
  } catch (_) {}

  const {
    modules = false,
    useBuiltIns = false,
    runtime = 'classic',
    nodeVersion,
  } = options

  return {
    presets: [
      [
        require('@babel/preset-react').default,
        {
          ...(runtime !== 'automatic' ? { useBuiltIns: true } : {}),
          runtime,
        }
      ],
      isTest && [
        require('@babel/preset-env').default,
        {
          targets: { node: 'current' }
        }
      ],
      isProd && [
        require('@babel/preset-env').default,
        {
          loose: true,
          corejs: useBuiltIns ? 3 : false,
          modules,
          useBuiltIns,
          // when node version is specified, use nodeVersion first,
          // otherwise let browserslist works
          ...(nodeVersion ? {
            targets: { node: nodeVersion }
          } : {}),
          exclude: ['@babel/plugin-transform-typeof-symbol'],
        },
      ],
    ].filter(Boolean),
    plugins: [
      [
        require('@babel/plugin-proposal-class-properties').default,
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
        require('@babel/plugin-proposal-optional-chaining').default,
        { loose: true },
      ],
      [
        require('@babel/plugin-proposal-nullish-coalescing-operator').default,
        { loose: true },
      ]
    ].filter(Boolean),
  };
};

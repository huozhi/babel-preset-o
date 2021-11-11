const path = require('path')

module.exports = (api, options = {}) => {
  const {
    modules = false,
    useBuiltIns = false,
    runtime = 'classic',
    targets,
  } = options
  let absoluteRuntime = undefined
  try {
    absoluteRuntime = path.dirname(
      require.resolve('@babel/runtime/package.json')
    )
  } catch (_) {}

  return {
    presets: [
      [
        require('@babel/preset-react').default,
        {
          ...(runtime !== 'automatic' ? { useBuiltIns: true } : {}),
          runtime,
        }
      ],
      [
        require('@babel/preset-env').default,
        {
          loose: true,
          modules,
          useBuiltIns,
          ...(targets && { targets }),
          exclude: ['@babel/plugin-transform-typeof-symbol'],
        },
      ],
    ].filter(Boolean),
    plugins: [
      [
        require('@babel/plugin-proposal-class-properties').default,
        { loose: true },
      ],
      [
        require('@babel/plugin-transform-runtime').default,
        {
          corejs: false,
          helpers: false,
          regenerator: true,
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

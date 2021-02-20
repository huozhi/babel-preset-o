# babel-preset-o
> tiny and flexible babel preset

cover basic usage for react development
## Usage

```sh
npm i -D babel-preset-o
```

babel.config.js
```js
module.exports = {
  presets: ['babel-preset-o']  
}
```

## Options
Use this preset with customized options to extend flexibility of compilation.
#### `nodeVersion`

Default is `undefined`, will use browserslist if project specified. Ref to [babel-preset-env#targetsnode](https://babeljs.io/docs/en/babel-preset-env#targetsnode)
#### `modules`

Default is `false`, ref to [babel-preset-env#modules](https://babeljs.io/docs/en/babel-preset-env#modules)
#### `useBuiltIns`

Default is `false`, ref to [babel-preset-env#usebuiltins](https://babeljs.io/docs/en/babel-preset-env#usebuiltins)
#### `runtime`

Default is `'classic'`, Ref to [babel-preset-react#runtime](https://babeljs.io/docs/en/babel-preset-react#runtime)

### Example

```js
// babel.config.js
module.exports = {
  presets: [
    ['babel-preset-o', { modules: 'commonjs', nodeVersion: '8' }]
  ]  
}
```

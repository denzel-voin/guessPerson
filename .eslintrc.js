module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb'],
  plugins: ['react', 'jsx-a11y', 'import'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'import/no-commonjs': 'off',
  },
};

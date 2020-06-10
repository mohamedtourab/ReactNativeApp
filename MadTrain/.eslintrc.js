module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'eslint-plugin-prettier',
    'eslint-plugin-react',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
  },
  env: {
    jest: true,
    es6: true,
  },
};

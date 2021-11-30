module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "airbnb", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking", "plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint

    }
  },
  rules: {
    'react/jsx-filename-extension': [1, {
      extensions: ['.tsx', '.ts']
    }],
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 0,
    // note you must disable the base rule as it can report incorrect errors
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': ['error']
  }
};
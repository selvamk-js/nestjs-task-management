module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint','@typescript-eslint/eslint-plugin','prettier'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export':0,
    'no-useless-constructor':0,
    "@typescript-eslint/no-shadow": ["error"],
    "no-shadow": "off",
    "class-methods-use-this": 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".ts",]
      }
    }
  },
};

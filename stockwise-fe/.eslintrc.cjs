module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier', 'react-app'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-plusplus': ['off'],
    'arrow-body-style': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
    'react/function-component-definition': [
      1,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-empty-function': ["error", { "allow": ["constructors"] }],
    'import/no-cycle': 'off',
    'react-hooks/exhaustive-deps': ['off'],
    'class-methods-use-this': 'off',
  },
};

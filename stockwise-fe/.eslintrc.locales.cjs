import path from 'path';

module.exports = {
  extends: ['prettier', 'plugin:i18n-json/recommended', 'plugin:json/recommended'],
  rules: {
    'i18n-json/valid-message-syntax': [
      2,
      {
        syntax: path.resolve('./i18next-eslint-syntax'),
      },
    ],
    'i18n-json/valid-json': 2,
    'i18n-json/sorted-keys': [
      2,
      {
        order: 'asc',
        indentSpaces: 2,
      },
    ],
    'i18n-json/identical-keys': 0,
    'json/duplicate-key': ['error'],
  },
};

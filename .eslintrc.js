module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'func-names': ['error', 'never'],
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/label-has-for': 'off',
  },
  overrides: [
    {
      files: [
        '*.vue',
        '*.js',
      ],
      rules: {
        'max-len': 'off',
        'vue/max-len': [
          'error',
          {
            code: 120,
            template: 9000,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
            ignoreStrings: true,
          },
        ],
      },
    },
  ],
};

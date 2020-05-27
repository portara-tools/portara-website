module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};

// TO RUN LINTER MANUALLY, RUN THIS FROM PROJECT ROOT
// yarn eslint . --ext .js,.jsx,.ts,.tsx 
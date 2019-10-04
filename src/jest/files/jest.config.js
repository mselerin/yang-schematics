module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [`${__dirname}/jest.setup.ts`],
  moduleNameMapper: {
    '^@app/(.*)': '<rootDir>/src/app/$1',
    '^@env/(.*)': '<rootDir>/src/environments/$1',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|svg|woff|woff2)$': 'jest-transform-stub'
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: ['jest-preset-angular/InlineHtmlStripStylesTransformer'],
      diagnostics: {
        ignoreCodes: ['TS151001']
      }
    }
  }
};

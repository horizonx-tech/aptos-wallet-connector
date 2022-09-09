module.exports = {
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', 'src/cli/index.ts'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+.(j|t)s$': [
      '@swc/jest',
      {
        sourceMaps: true,
        module: { type: 'commonjs' },
        jsc: {
          parser: { syntax: 'typescript' },
          transform: { react: { runtime: 'automatic' } },
        },
      },
    ],
  },
}

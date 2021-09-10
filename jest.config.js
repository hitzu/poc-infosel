module.exports = {
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/docs/**'
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  roots: ['<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '<rootDir>/src/tests/setup.ts'],
  verbose: false,
};
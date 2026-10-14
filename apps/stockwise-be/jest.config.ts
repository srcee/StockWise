export default {
  displayName: 'stockwise-be',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {'^.+\\.[tj]s$': ['ts-jest', {tsconfig: '<rootDir>/tsconfig.spec.json'}]},
  moduleFileExtensions: ['ts', 'js', 'html'],
  // Lets the app's absolute `src/...` imports resolve.
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  coverageDirectory: '../../coverage/apps/stockwise-be',
};

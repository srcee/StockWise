import baseConfig from './jest.config';

export default {
  ...baseConfig,
  displayName: 'stockwise-be-e2e',
  testMatch: ['<rootDir>/test/**/*.e2e-spec.ts'],
  coverageDirectory: '../../coverage/apps/stockwise-be-e2e',
};

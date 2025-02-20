module.exports = {
  default: [
    '--require-module ts-node/register',
    ' --require-module tsconfig-paths/register',
    '--require ./features/**/*.ts',
    '--require ./features/*.ts',
    '--require ./feature-steps/ui-todo.feature-steps.ts',
  ].join(' '),
  infra: [
    '--require-module ts-node/register',
    '--require-module tsconfig-paths/register',
    '--require ./features/**/*.ts',
    '--require ./features/*.ts',
  ].join(' '),
  e2e: [
    '--require-module ts-node/register',
    '--require-module tsconfig-paths/register',
    '--require ./features/**/*.ts',
    '--require ./features/*.ts',
    '--require ./tests/e2e.hooks.ts',
    '--require ./feature-steps/ui-e2e.feature-steps.ts',
    '--tags "@all or @e2e"',
  ].join(' '),
};
  
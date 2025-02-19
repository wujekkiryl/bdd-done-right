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
      ' --require-module tsconfig-paths/register',
      '--require ./features/**/*.ts',
      '--require ./features/*.ts',
      '--require ./libs/api/profile/src/lib/tests/hooks.ts',
      '--require ./libs/api/profile/src/lib/agency/tests/infra/featureSteps.ts',
      '--require ./libs/api/profile/src/lib/theme/tests/infra/featureSteps.ts',
      '--require ./libs/api/profile/src/lib/agreement/tests/infra/featureSteps.ts',
      '--require ./libs/api/integration/src/lib/tests/infra/feature-steps.ts',
    ].join(' '),
  };
  
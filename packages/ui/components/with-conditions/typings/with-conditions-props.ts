import type { PropsWithChildren, ReactNode } from 'react';

import type { WithConditionsOperator } from '@/packages/ui';

type WithConditionsForNonTernary = PropsWithChildren & {
  operator?: WithConditionsOperator;
  conditions: boolean | boolean[];
  failure?: ReactNode;
};

export type WithConditionsProps = WithConditionsForNonTernary extends {
  operator: WithConditionsOperator.Ternary;
}
  ? WithConditionsForNonTernary & { failure: ReactNode }
  : WithConditionsForNonTernary;

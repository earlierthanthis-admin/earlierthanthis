import type { WithConditionsProps } from '@/packages/ui/components/with-conditions/typings';

import { WithConditionsOperator } from './with-conditions-operator';

export const WithConditions = ({
  conditions = [],
  children,
  operator = WithConditionsOperator.And,
  failure = null,
}: WithConditionsProps) => {
  const conditionsList = Array.isArray(conditions) ? conditions : [conditions];
  const shouldNotRenderWithAnd =
    operator === WithConditionsOperator.And && conditionsList.includes(false);
  const shouldNotRenderWithOr =
    operator === WithConditionsOperator.Or && !conditionsList.includes(true);
  if (shouldNotRenderWithAnd || shouldNotRenderWithOr) {
    return null;
  }

  if (operator === WithConditionsOperator.Ternary) {
    return conditionsList.includes(false) ? failure : children;
  }

  return children;
};

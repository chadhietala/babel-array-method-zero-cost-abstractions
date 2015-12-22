export const increment = (t, ref) => {
  const { updateExpression } = t;
  return updateExpression('++', ref);
}
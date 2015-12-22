export const computedArrayLookup = (t, id, ref, array) => {
  const { variableDeclarator, identifier, memberExpression } = t;
  return variableDeclarator(identifier(id), memberExpression(array, ref, true));
};

export const arrayAssignment = (t, array, ref, right) => {
  return t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(array, ref, true),
      right
    )
  );
};
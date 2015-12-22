
/**
 * Creates an initial pointer for a loop.
 */

const initialization = (t, ref) => {
  const { variableDeclaration,
          variableDeclarator,
          identifier } = t;
  return variableDeclaration('var', [
    variableDeclarator(
    ref,
    identifier('0')
  )]); 
};

export const aliasPointer = (t, alias, ref) => {
  const { variableDeclarator, identifier } = t;
  return variableDeclarator(identifier(alias), ref)
};

export default initialization;
import array from './array';

const arrayLength = (t, obj, isIdentifier) => {
  const { identifier } = t;
  let pieces = array(t, obj).split('.');
  pieces.push('length');
  let path = pieces.join('.');
  if (isIdentifier) {
    return identifier(path);
  }
  
  return path;
};

export const fixedArray = (t, obj, ref) => {
  const { newExpression,
          identifier,
          variableDeclaration,
          variableDeclarator } = t;
          
  let length = arrayLength(t, obj, true);
  return variableDeclaration('var', [
    variableDeclarator(ref, newExpression(identifier('Array'), [length]))
  ]);
};

export default arrayLength;
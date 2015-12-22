const array = (t, obj, isIdentifier) => {
  let properties = [];
  let propertyPath;
  const { identifier } = t;
  
  if (obj.type === 'Identifier') {
    propertyPath = properties.concat(obj.name).reverse().join('.');
    if (isIdentifier) {
      return identifier(propertyPath);
    }
    return propertyPath;
  }
  
  while (obj.property) {
    properties = properties.concat(obj.property.name);

    if (obj.object.name) {
      properties = properties.concat(obj.object.name);
    }
    obj = obj.object;
  }

  propertyPath = properties.reverse().join('.');

  if (isIdentifier) {
    return identifier(propertyPath);
  }

  return propertyPath;
};

export default array;

export const aliasArray = (t, alias, array) => {
  const { variableDeclarator, identifier } = t;
  return variableDeclarator(identifier(alias), array);
};
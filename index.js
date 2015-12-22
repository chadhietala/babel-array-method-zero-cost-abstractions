import forEach from './lib/for-each';
import map from './lib/map';

export default function({types: t}) {
  let callExpression;

  return {
    visitor: {
      CallExpression(path) {
        if (path.parentPath.type === 'VariableDeclarator') {
          callExpression = path.parentPath.parentPath;
        } else if (path.parentPath.type  === 'ExpressionStatement') {
          callExpression = path.parentPath
        }
      },
      MemberExpression(path, state) {
        if (path.key === 'callee' && 
           (path.parent.arguments[0].type === 'FunctionExpression' || path.parent.arguments[0].type === 'ArrowFunctionExpression')) {

          let method = path.node.property.name;

          if (method === 'forEach') {
            forEach(t, callExpression, path);
          } else if (method === 'map') {
            map(t, callExpression, path);
          }
        }
      }
    }
  };
};
import constructBlock from './construct-block';
import i from './initialization';
import lengthCondition from './condition';
import { increment } from './after-thought';

const constructBody = (t, path, inlinedSignature) => {
  let isExpression = path.container.arguments[0].expression;
  let body;
  const { expressionStatement,
          blockStatement,
          variableDeclaration } = t;

  if (isExpression) {
    // Cast MemberExpression to ExpressionStatement
    body = expressionStatement(path.container.arguments[0].body);
  } else {
    body = path.container.arguments[0].body.body;
  }

  return blockStatement([variableDeclaration('var', inlinedSignature)].concat(body));
};

const forEach = (t, path, callExpression) => {
  const { ForStatement } = t;
  let ref = path.scope.generateUidIdentifier('i');
  let params = path.parentPath.node.arguments[0].params;
  let inlinedSignature = constructBlock(t, params, ref, path);
  let body = constructBody(path, inlinedSignature);
  
  let args = [i(t, ref),
              lengthCondition(t, path, ref),
              increment(t, ref),
              body];
  callExpression.replaceWith(ForStatement.apply(null, args));
}

export default forEach;
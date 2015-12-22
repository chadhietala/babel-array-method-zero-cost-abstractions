import constructBlock from './construct-block';
import i from './initialization';
import lengthCondition from './condition';
import { increment } from './after-thought';
import { fixedArray } from './array-length';
import { arrayAssignment } from './member-expression-lookup';

const constructBody = (t, path, inlinedSignature) => {
  let isExpression = path.container.arguments[0].expression;
  let body;
  const { expressionStatement, blockStatement, variableDeclaration } = t;

  if (isExpression) {
    // Cast MemberExpression to ExpressionStatement
    body = expressionStatement(path.container.arguments[0].body);
  } else {
    body = path.container.arguments[0].body.body;
  }

  return blockStatement([variableDeclaration('var', inlinedSignature)].concat(body));
};

const map = (t, path, callExpression) => {
  const { ForStatement,
          variableDeclaration,
          variableDeclarator,
          identifier } = t;
  let ref = path.scope.generateUidIdentifier('i');
  let array = path.scope.generateUidIdentifier('a');
  let params = path.parentPath.node.arguments[0].params;

  callExpression.traverse({
    ReturnStatement(p) {
      var args = [arrayAssignment(t, array, ref, p.node.argument)];

      
      p.replaceWithMultiple(args);
    }
  });
  
  let inlinedSignature = constructBlock(t, params, ref, path);
  let body = constructBody(t, path, inlinedSignature);

  let args = [i(t, ref),
              lengthCondition(t, path, ref),
              increment(t, ref),
              body];
  let replacements = [fixedArray(t, path.node.object, array)];

  if (path.parentPath.container.type === 'VariableDeclarator') {
    let alias = path.parentPath.container.id.name;
    replacements.push(variableDeclaration('var', [variableDeclarator(identifier(alias), array)]));
  }
  
  replacements.push(ForStatement.apply(null, args));
  callExpression.replaceWithMultiple(replacements);
}

export default map;
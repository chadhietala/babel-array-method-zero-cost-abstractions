import arrayLength from './array-length';

const condition = (t, path, ref) => {
  const { binaryExpression } = t;
  return binaryExpression('<', ref, arrayLength(t, path.node.object, true));
};

export default condition;
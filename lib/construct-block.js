import {default as array, aliasArray } from './array';
import { computedArrayLookup } from './member-expression-lookup';
import { aliasPointer } from './initialization';

const constructBlock = (t, params, ref, path) => {
  let ret = [];
  
  if (params.length === 0) {
    return;
  }

  let arr = array(t, path.node.object, true);
  let item = computedArrayLookup(t, params[0].name, ref, arr);

  switch (params.length) {
    case 1:
      ret.push(item);
      break;
    case 2:
      ret.push(item, aliasPointer(t, params[1].name, ref));
      break;
    case 3:
      ret.push(item, aliasPointer(t, params[1].name, ref), aliasArray(t, params[2].name, arr));
      break;
    }

    return ret;
};

export default constructBlock;
Transforms for ES5 array methods.

## Why?

Unfortunately array methods are not a 0 cost abstraction and they do such things as allocate context objects when you close over items. This allows us to compile away those things into less costly code.
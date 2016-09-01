Transforms for ES5 array methods.

## Why?

Unfortunately array methods are not a 0 cost abstraction and they do such things as allocate context objects when you close over items. This allows us to compile away those things into less costly code.

## Example
```js
// Input:
[1, 2, 3]
  .map(x => x + 2)
  .map(x => x * 2)

// Output:
const array = [1, 2, 3]

for (let i = 0; i < array.length; i++) {
  array[i] = (array[i] + 2) * 2
}

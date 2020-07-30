# @interface

## Indexable Types

the type returned from a numeric indexer must be a subtype of the type returned from the string indexer 

```typescript
interface Index {
  [prop: string]: string | number
  [index: number]: boolean
}
// 上述 Index 接口会报错：
// Numeric index type 'boolean' is not assignable
// to string index type 'string | number'

interface Index {
  [prop: string]: string | number
  [index: number]: string
}
// ok
```
---

## Interfaces Extending Classes

When an interface type extends a class type it ***inherits the members of the class but not their implementations***

```typescript
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

// Control的子类可以implements
class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {
  select() {}
}

// 非Control及其子类implements 接口 SelectableControl会报错:
class ImageControl implements SelectableControl {
  // Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
  // Types have separate declarations of a private property 'state'
  private state: any;
  select() {}
}
```

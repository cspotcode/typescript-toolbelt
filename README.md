# typescript-toolbelt

Helpers & utility types for TypeScript projects.

## Usage

To put type helpers into the global scope:

```typescript
/// <reference types="typescript-toolbelt/global" />
```

...or add to your tsconfig's `"files"` or `"include"` array:

```json
"files": [
    "node_modules/typescript-toolbelt/global.d.ts"
]
```

To expose type helpers as a global `TT` namespace, reference `typescript-toolbelt/namespace`:

```typescript
/// <reference types="typescript-toolbelt/namespace" />
```

...or put it in your tsconfig as shown above.

A few helpers require a runtime value.  This will be an identity or no-op function.  Thankfully, these 
should be removed or inlined by a code minifier and/or the JS VM.
These must be imported, because it would be messy to attach them to the global object.

Fortunately, if you're using a supported editor, you can reference them in code and the
language service will offer to write the import statement for you.

```typescript
import { narrowLiterals } from 'typescript-toolbelt';

const foo = narrowLiterals(['a', 'b', 'c']);
```

React-specific helpers should be imported from `typescript-toolbelt/react`.
These can't be loaded by default because they have a peer dependency on `@types/react`.

## Docs

Until I get around to generating a website from the documentation, use tab-complete in your editor to see the list
of helpers and flip through their documentation.  Or read the source.

## Things already bundled in TypeScript

TypeScript already includes a bunch of type declarations you might not be aware of.  Here's an incomplete list:

```typescript
ArrayLike<T> // Minimal Array interface, without all the obscure methods and Symbols.

Partial<T> // T, except all properties are optional
Required<T> // T, except none of the properties are optional

Record<K, T> // object-based map from K to T

Readonly<T> // T, except all properties are readonly
ReadonlyArray<T> // Readonly array.  Type system will forbid assignment to items and accessing methods that mutate, like `push()`
ReadonlyMap<K, V> // Readonly ECMAScript Map
ReadonlySet<V> // Readonly ECMAScript Set

Extract<T, U> // filter a union type T to only the types that extend U
Exclude<T, U> // opposite of Extract; filter union T to only the types that *do not* extend U

NonNullable<T> // Remove `null` and `undefined` from a union type.

ReturnType<F> // Extract the return type of an invokable type (function)
InstanceType<C> // Extract the instance type of a `new`-able type (constructor)

Pick<T, K> // Grab only properties K of interface T.  Useful with `Extract`, `Exclude`, and `keyof`
```

---

## TODO

* add DeepReadonly, DeepMutable, DeepPartial, DeepRequired, DeepNonNullable, DeepNullable (any others?)

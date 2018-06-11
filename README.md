# typescript-toolbelt

Helpers &amp; type declarations for TypeScript projects.

## Usage

To put type helpers into the global scope:

```typescript
/// <reference types="typescript-toolbelt/global" />
```

...or add to your tsconfig's `"files"` or `"include"` array:

```json
"files": [
    "node_modules/typescript-toolbelt/global"
]
```

To expose type helpers as a global `TT` namespace, reference `typescript-toolbelt/namespace`:

```typescript
/// <reference types="typescript-toolbelt/namespace" />
```

...or put it in your tsconfig as shown above.

A few helpers require a runtime component.  This will be an identity or no-op function which
should be removed or inlined by Uglify or the VM.
These must be imported because it would be irresponsible to create them in global scope.

Fortunately, if you're using a supported editor, you can reference them like normal and the
language service will offer to write the import statement for you.

```typescript
import { narrowLiterals } from 'typescript-toolbelt';

const foo = narrowLiterals(['a', 'b', 'c']);
```

React-specific helpers should be imported from `typescript-toolbelt/react';`
These can't be loaded by default because they have a peer dependency on `@types/react`.

## Docs

Until I get around to generating a website from the documentation, use tab-complete in your editor to see the list
of helpers and flip through their documentation.  Or read the source.

## Things already bundled in TypeScript

TypeScript already includes a bunch of type declarations you might not be aware of.  Here's an incomplete list:

```typescript
ArrayLike<T>

Partial
Required

Record

Readonly<T>
ReadonlyArray<T>
ReadonlyMap<K, V>
ReadonlySet<V>

Extract<T, U>
Exclude<T, U>

NonNullable

ReturnType<F>
InstanceType<C>
Pick<T, K>
```

---

## TODO

* add DeepReadonly, DeepMutable, DeepPartial, DeepRequired, DeepNonNullable, DeepNullable (any others?)

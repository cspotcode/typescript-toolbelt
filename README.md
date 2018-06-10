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


## Defunct Stuff

```typescript
// Don't use this; TS has a built-in ReadonlyArray type
type ImmutableArray<T> = {
    // Readonly versions of a ton of methods and properties from normal arrays.  Only the ones that don't mutate the array.
    readonly [P in
        'concat' | 'entries' | 'every' | 'filter' | 'find' | 'findIndex'
        | 'forEach' | 'indexOf' | 'join' | 'keys' | 'lastIndexOf' | 'length'
        | 'map' | 'reduce' | 'reduceRight'| 'slice' | 'some' | 'toLocaleString'
        | 'toString' | 'values']: Array<T>[P];
} & {
    // Readonly numeric index
    readonly [i: number]: T;
}

// Modifier removal is natively supported in TS2.8!
// Prefix the modifiers with a minus sign within mapped types to remove them
// There's also a built-in Required<> generic that does the opposite of Partial<>
/**
 * This type strips the readonly and optional modifiers from all properties of an interface.
 *
 * Mapped types that are homomorphic (structure-preserving) will preserve the readonly and optionality attributes of properties.
 * However, sometimes we want to strip these attributes from a type.  Mapped types make it easy to add readonly or optionality modifiers
 * (Readonly<> and Partial<>) but not to remove them.  For example, given an interface like {a?: string; b?: number}
 * how do we make each property required?
 *
 * https://github.com/Microsoft/TypeScript/issues/13224#issuecomment-269807806
 *
 * EXAMPLE:
 *
 * interface Funky {
 *     readonly immutable: string;
 *     opt?: string;
 * }
 * type Plain = StripModifiers<Funky>;
 * const a: Plain = { // error because opt is required
 *     immutable: ''
 * };
 * a.immutable = 'a'; // not error because immutable is writable
 */
type StripModifiers<T> = {[P in {[P in keyof T]: P }[keyof T]]: T[P]};

```

# typescript-toolbelt
Helpers &amp; type declarations for TypeScript projects.

```typescript
/**
 * When you're too lazy or rushed to use proper type declarations, use TODO
 * This is different from `any` because you *can* apply more appropriate typings;
 * you just chose not to due to time constraints.
 */
type TODO = any;

/** A JS array except that you can't do anything that would modify its contents. */
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

/**
 * Narrows the type of array elements to a union of literals.
 * Useful for building a union type from an array of strings or numbers without repetition.
 * Sample usage:
 * const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
 * type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'
 */
function narrowLiterals<T extends string>(array: Array<T>): Array<T>;
function narrowLiterals<T extends number>(array: Array<T>): Array<T>;
function narrowLiterals(array) {return array;}
```

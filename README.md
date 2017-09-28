# typescript-toolbelt
Helpers &amp; type declarations for TypeScript projects.

```typescript
/**
 * When you're too lazy or rushed to use proper type declarations, use TODO
 * This is different from `any` because you *can* apply more appropriate typings;
 * you just chose not to due to time constraints.
 */
type TODO = any;

/**
 * Simple object-backed Dictionary interface.  Slightly less verbose than declaring a subscripting signature.
 */
interface Dictionary<T> {
    [key: string]: T;
}
interface ImmutableDictionary<T> {
    readonly [key: string]: T;
}

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
 * Only necessary when you need the array of strings at runtime *and* you need the union type at compile-time.
 * Not appropriate when you only want one or the other.
 * 
 * Sample usage:
 * const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
 * type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'
 */
function narrowLiterals<T extends string>(array: Array<T>): Array<T>;
function narrowLiterals<T extends number>(array: Array<T>): Array<T>;
function narrowLiterals(array) {return array;}

/**
 * Declared return type is the same as the passed function `fn`.
 * However, at runtime, always returns undefined and never invokes `fn`.
 * Useful for getting the type of an expression without any runtime side-effects.
 * TypeScript otherwise doesn't have any syntax for getting the inferred type of an expression.
 *
 * Usage:
 *    const __ignored = typeOfExpression(() => classFactoryFoo('bar'));
 *    type MyType = typeof __ignored;
 */
function typeOfExpression<T>(fn: (_?: any) => T): T;
function typeOfExpression() {};

/*
 * Copied from http://ideasintosoftware.com/typescript-advanced-tricks/
 * Diff<StringUnion, StringUnionToSubtract> is a string literal union of all the values in StringUnion that do not appear in StringUnionToSubtract
 * Omit<T, KeysToOmit> is type T but without all the properties named by KeysToOmit.
 * My addition, OmitFromInterface<T, U> is like Omit except it omits the *properties* of the second type, so U is an interface as well.
 */
type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
type OmitInterface<T, U> = Omit<T, keyof U>;
```

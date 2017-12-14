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
// TS has this built-in!
const a: ReadonlyArray<number> = [1, 2, 3];

/** Also ReadonlyMap, ReadonlySet, and Readonly */

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

/*
 * Mapped types that are homomorphic will preserve the readonly and optionality attributes of properties.
 * However, sometimes we want to strip these attributes from a type.  For example, given a Partial<SomeInterface>,
 * how do we make each property required if we don't have access to SomeInterface?
 * 
 * This declaration strips the readonly and optional attributes from an interface.
 *
 * https://github.com/Microsoft/TypeScript/issues/13224#issuecomment-269807806
 */
type StripPropertyAttributes<T> = {[P in {[P in keyof T]: P }[keyof T]]: T[P]};

// example
interface Funky {
    readonly immutable: string;
    opt?: string;
}
const a: StripPropertyAttributes<Funky> = {
    immutable: '' // error because opt is required
}
a.immutable = 'a'; // not error because immutable is no longer readonly
```

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
```

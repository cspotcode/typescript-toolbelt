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

/* A JS array except that you can't do anything that would modify its contents. */
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

/**
 * Picks only the properties of a certain type.
 * For example, you can filter an interface to include only properties that are numbers.
 * Requires TS 2.8
 */
type PickOfType<Object, PropertyExtends> = {
    [FilteredProp in {[P in keyof Object]: Object[P] extends PropertyExtends ? P : never}[keyof Object]]: Object[FilteredProp];
}
/**
 * Opposite of PickOfType
 * Excludes properties that extend a type; includes all others.
 */
type PickNotOfType<Object, PropertyDoesNotExtend> = {
    [FilteredProp in {[P in keyof Object]: Object[P] extends PropertyExtends ? never : P}[keyof Object]]: Object[FilteredProp];
}

/**
 * No-op class decorator that ensures the class's constructor implements a given interface.
 * A normal `implements` clause only asserts that instances implement the interface,
 * whereas this decorator makes an assertion about the constructor itself. 
 *
 * EXAMPLE:
 *
 * @AssertConstructorImplements<FooCtor>
 * class FooImplementation { // 2 errors because staticMethod is missing and constructor signatures are incompatible
 *     constructor(public c: boolean) {}
 * }
 * interface FooCtor {
 *     new(a: number): Foo;
 *     staticMethod(b: string): void;
 * }
 */
function AssertConstructorImplements<T>() { return function(ctor: T) {}; }

/**
 * Write type annotations inline within nested object or array literals.
 * Use this to enable better Intellisense and write self-documenting code.
 * 
 * This is better than TS type assertions (e.g. `<MyInterface>{}`) because
 * type assertions allow type narrowing, which suppresses certain type errors.
 *
 * For example, in the following situation, Intellisense is useless without an explicit
 * type annotation enabled via this function:
 * 
 *     const a: Dictionary<any> = {
 *         first: someValue,
 *         second: someOtherValue,
 *         windowShim: T<Partial<Window>>({ // We want code completion for properties of the window object
 *             // <- intellisense shows us setTimeout, document, alert, btoa, location, onblur, etc.
 *         })
 */
function T<V>(value: V): V { return value }
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

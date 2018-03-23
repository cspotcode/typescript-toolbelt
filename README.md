# typescript-toolbelt
Helpers &amp; type declarations for TypeScript projects.

```typescript
/**
 * When you're too lazy or rushed to use proper type declarations, use TODO
 * This is different from `any` because you *can* apply more appropriate typings;
 * you just choose not to due to time constraints.
 */
type TODO = any;

/**
 * Simple object-backed Dictionary interface.  Slightly less verbose than declaring a subscripting signature.
 */
interface Dictionary<T> = Record<string, T>;

interface ImmutableDictionary<T> = Readonly<Record<string, T>>;

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

// UPDATE: partially (completely?) supplanted by inference in conditional types, added in TS2.8
/**
 * Declared return type is the same as the passed function `fn`.
 * However, at runtime, always returns undefined and never invokes `fn`.
 * Useful for getting the type of an expression without any runtime side-effects.
 * TypeScript otherwise doesn't have any syntax for extracting the inferred type of an expression.
 *
 * Usage:
 *    const __ignored = typeOfExpression(() => classFactoryFoo('bar'));
 *    type MyType = typeof __ignored;
 */
function typeOfExpression<T>(fn: (_?: any) => T): T;
function typeOfExpression() {};

/*
 * Copied from http://ideasintosoftware.com/typescript-advanced-tricks/
 * Omit<T, KeysToOmit> is type T but without all the properties named by KeysToOmit.
 * My addition, OmitFromInterface<T, U> is like Omit except it omits the *properties* of the second type, so U is an interface as well.
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type OmitInterface<T, U> = Omit<T, keyof U>;

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
 * @AssertImplements<FooCtor>
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

/*
 * Conditional types operating on a union work sorta like Array::map.
 * The result is a new union combining the results of running the conditional against each type in the union.
 * Sometimes, we want something different:
 * We want a conditional to return a single type depending on if *all* members of the input union extend
 * (or do not extend) something.  Sorta like Array::every or Array::some
 */

/** Conditional that tests if all types in a union extend a type */
type AllInUnionMatch<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch> = (
    Union extends Match ? never : {__fail_marker: any}
) extends never ? ResultIfAllMatch : ResultIfSomeDoNotMatch;

/** Conditional that tests if all types in a union *do not* extend a type */
type NoneInUnionMatch<Union, Match, ResultIfNoneMatch, ResultIfSomeDoMatch> = (
    Union extends Match ? {__fail_marker: any} : never
) extends never ? ResultIfNoneMatch : ResultIfSomeDoMatch;

/** Conditional that tests if at least one type in a union extends a type */
type SomeInUnionMatch<Union, Match, ResultIfSomeMatch, ResultIfNoneMatch> = NoneInUnionMatch<Union, Match, ResultIfNoneMatch, ResultIfSomeMatch>;
/** Conditional that tests if at least one type in a union *does not* extend a type */
type SomeInUnionDoNotMatch<Union, Match, ResultIfSomeDoNotMatch, ResultIfAllMatch> = AllInUnionMatch<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch>;

/**
 * When you require something that's invocable.
 * Optionally require a specific return type and/or acceptance of certain argument types,
 * but at that point you should probably write out the function signature directly.
 */
type AnyFunction<Returns = any, A = any, B = any, C = any, D = any, E = any, Rest = any> = (a: A, b: B, c: C, d: D, ...args: Rest[]) => Returns;

/** When you require a constructor, e.g. for mixins */
type Constructor<Instance = {}, A = any, B = any, C = any, D = any, E = any, Rest = any> = new (a: A, b: B, c: D, d: D, ...args: Rest[]) => Instance;

/**
 * Extract constructor type of a mixin.
 * Usage: type FooConstructor = MixinConstructorType<typeof Foo>;
 */
type MixinConstructorType<MixinFunction, BaseClass = 'auto'> = BaseClass extends 'auto' ? (
    MixinFunction extends (Base: infer B) => infer C ? C : never
) : (
    MixinFunction extends (Base: BaseClass) => infer C ? C : never
);

/**
 * Extract instance type of a mixin
 * Usage: type Foo = MixinType<typeof Foo>;
 */
type MixinType<MixinFunction, BaseClass = 'auto'> =
    MixinConstructorType<MixinFunction, BaseClass> extends infer R
    ? R extends Constructor
    ? InstanceType<R>
    : never : never;
```

## TODO

* add DeepReadonly, DeepMutable, DeepPartial, DeepRequired, DeepNonNullable, DeepNullable (any others?)

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

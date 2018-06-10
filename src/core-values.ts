import { Writable } from './core';

/*
 * Anything with a value (not merely a type)
 * For example, identity or no-op helper functions.
 * 
 * We keep them separate because they're excluded from type-only bundles (global.d.ts and namespace.d.ts)
 */
export {
    narrowLiterals,
    typeOfExpression,
    T,
    TI,
    Writable
};

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
function narrowLiterals<T extends number>(array: Array<T>): Array<T>;
function narrowLiterals(array: Array<number | string>) {return array;}

/**
 * Extract inferred return type of an expression *without* invoking it.
 * *NOTE: Almostly completely supplanted by inference in conditional types in TS2.8*
 * 
 * Declared return type is the same as the passed function `fn`.
 * However, at runtime, always returns undefined and never invokes `fn`.
 * TypeScript otherwise doesn't have any syntax for extracting the inferred type of an expression.
 * 
 * As noted, conditional types can usually do the trick.  They ignore overloaded function signatures,
 * so this trick may still be necessary in certain situations.
 *
 * Usage:
 *    const __ignored = typeOfExpression(() => classFactoryFoo('bar'));
 *    type MyType = typeof __ignored;
 */
function typeOfExpression<T>(fn: (_?: any) => T): T;
function typeOfExpression() {};

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

/**
 * Short for "Type Inferred"
 * Write a type requirement inline within nested object or array literals, but allow inference to
 * narrow the type.
 * Use this to enable better Intellisense and write self-documenting code.
 * 
 * This is better than TS type assertions (e.g. `<MyInterface>{}`) because
 * type assertions allow type narrowing, which suppresses certain type errors.
 * 
 * NOTE: usage requires an extra set of empty parentheses.  This is a generics trick.
 *
 * For example, in the following situation, Intellisense is useless without an explicit
 * type annotation enabled via this function:
 * 
 *     const a: Dictionary<any> = {
 *         first: someValue,
 *         second: someOtherValue,
 *         windowShim: TI<Partial<Window>>()({ // We want code completion for properties of the window object
 *             // <- intellisense shows us setTimeout, document, alert, btoa, location, onblur, etc.
 *         })
 */
function TI<V>() {
    return T as <V2 extends V>(v: V2) => V2;
}

/**
 * Sometimes you want to write a class with a readonly property (for the sake of public API)
 * but you (rarely) need to privately mutate that property.
 * Use this trick:
 * 
 *     Writable(this).normallyReadonlyProp = newValue;
 *     // or, if you really want to avoid the function call:
 *     (this as Writable<this>).normallyReadonlyProp = newValue;
 * 
 * Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
 * preferred in certain programming circles.
 */
function Writable<T>(t: T) {
    return t as Writable<T>;
}
// NOTE keep JSDoc in sync with type declaration

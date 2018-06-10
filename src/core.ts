//#if(data.EXPORT) {
export {
    TODO,
    Dictionary,
    ImmutableDictionary,
    KeyOf,
    Omit,
    PickOfType,
    OmitOfType,
    Writable,
    Writable as Mutable
}
export * from './core-values';
//#}

/**
 * When you're too lazy or rushed to use proper type declarations, use TODO
 * This is different from `any` because you *can* apply more appropriate typings;
 * you just choose not to due to time constraints.
 */
type TODO = any;

/**
 * Simple object-backed Dictionary interface.  Slightly less verbose than declaring a subscripting signature.
 */
type Dictionary<T> = Record<string, T>;

type ImmutableDictionary<T> = Readonly<Record<string, T>>;

/**
 * Backwards-compatible widest type returned by `keyof`
 * TS2.9 expanded `keyof` to include numeric and Symbol properties and index signatures;
 * previously it was limited to `string`
 */
type KeyOf = keyof any;

/*
 * Mapped type of T with all K keys omitted.
 */
type Omit<T, K extends KeyOf> = Pick<T, Exclude<keyof T, K>>;

/**
 * Picks only the properties of a certain type.
 * For example, you can filter an interface to include only properties that are numbers.
 * Requires TS 2.8
 */
type PickOfType<Object, T> = {
    [FilteredProp in {[P in keyof Object]: Object[P] extends T ? P : never}[keyof Object]]: Object[FilteredProp];
}

/**
 * Opposite of PickOfType
 * Excludes properties that extend a type; includes all others.
 */
type OmitOfType<Object, T> = {
    [FilteredProp in {[P in keyof Object]: Object[P] extends T ? never : P}[keyof Object]]: Object[FilteredProp];
}

/**
 * When you require something that's invocable.
 * Optionally require a specific return type and/or acceptance of certain argument types,
 * but at that point you should probably write out the function signature directly.
 */
type AnyFunction<Returns = any, A = any, B = any, C = any, D = any, E = any, Rest = any> = (a: A, b: B, c: C, d: D, ...args: Rest[]) => Returns;

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
type Writable<T, K extends keyof T = keyof T> = {-readonly [L in K]: T[L]};
// NOTE keep JSDoc in sync with type declaration

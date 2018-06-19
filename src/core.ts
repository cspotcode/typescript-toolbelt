//#if(data.EXPORT) {
export {
    TODO,
    Dictionary,
    ReadonlyDictionary,
    KeyOf,
    StringKeyOf,
    Omit,
    PickOfType,
    OmitOfType,
    Writable,
    Writable as Mutable,
    MapKeys
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

type ReadonlyDictionary<T> = Readonly<Record<string, T>>;

/**
 * Backwards-compatible widest type returned by `keyof`
 * TS2.9 expanded `keyof` to include numeric and Symbol properties and index signatures;
 * previously it was limited to `string`
 */
type KeyOf = keyof any;

/**
 * When you want to use `keyof T` but you know the keys are all strings.
 */
type StringKeyOf<T> = Extract<keyof T, string>;

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

// Breaking our rule and putting a value declaration here because it needs to be kept alongside
// the type of the same name
//# if(data.EXPORT) {

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
//#}

/**
 * Map all keys of a type verbatim.  This preserves all keys / properties, strips
 * invocation signatures, and merges intersection types.
 * 
 * It's common to build an intersection of mapped types.  The resulting `} & {` syntax in
 * tooltips makes them noisier and harder to read.
 * Mapping the result merges all intersected mapped types into a single interface.
 */
type MapKeys<T> = {
    [K in keyof T]: T[K];
}

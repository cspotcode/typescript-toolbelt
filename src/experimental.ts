//#if(data.EXPORT) {
export {
    ReplaceStringIndex
}
export * from './experimental-values';
//#}

/**
 * Map a type, replacing the `[x: string]: any` with `[x: string]: U`
 * JS typechecking automatically adds a string index signature to object literals.
 * I haven't devised a way to strip the string index signature, but we can at least
 * customize it.
 */
type ReplaceStringIndex<T, U> = {
    [K in keyof T]:
    K extends string ? string extends K
        // K is string and not a string literal; change its value
        ? U
        // otherwise leave this property untouched
        : K : K;
}

//#if(data.EXPORT) {
import { KeyOf } from "./core";

export {
    IfKeyIsOptional,
    IfKeysOverlap,
    IfAllInUnionMatch,
    IfNoneInUnionMatch,
    IfSomeInUnionMatch,
    IfSomeInUnionDoNotMatch,
}
//#}

/*
 * All conditionals follow the pattern:
 *   IfConditional<...Params, TRUE = true, FALSE = false>
 * 
 * The resolve to TRUE if the conditional passes; FALSE otherwise.
 */

/**
 * Conditionally check if property of an interface is optional
 */
type IfKeyIsOptional<T, K extends keyof T, TRUE = true, FALSE = false> = {[K2 in K]: T[K2]} extends {[K2 in K]-?: T[K2]} ? FALSE : TRUE;

// I can't seem to accomplish the same for `readonly`, unfortunately.

/**
 * Conditionally check if any keys exist in both unions.
 */
type IfKeysOverlap<T extends KeyOf, U extends KeyOf, TRUE = true, FALSE = false> = Extract<T, U> | Extract<U, T> extends never ? FALSE : TRUE;

/*
 * Conditional types operating on a union work sorta like Array::map.
 * The result is a new union combining the results of running the conditional against each type in the union.
 * Sometimes, we want something different:
 * We want a conditional to return a single type depending on if *all* members of the input union extend
 * (or do not extend) something.  Sorta like Array::every or Array::some
 */

/** Conditional that tests if all types in a union extend a type */
type IfAllInUnionMatch<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch> = (
    Union extends Match ? never : {__fail_marker: any}
) extends never ? ResultIfAllMatch : ResultIfSomeDoNotMatch;

/** Conditional that tests if all types in a union *do not* extend a type */
type IfNoneInUnionMatch<Union, Match, ResultIfNoneMatch, ResultIfSomeDoMatch> = (
    Union extends Match ? {__fail_marker: any} : never
) extends never ? ResultIfNoneMatch : ResultIfSomeDoMatch;

/** Conditional that tests if at least one type in a union extends a type */
type IfSomeInUnionMatch<Union, Match, ResultIfSomeMatch, ResultIfNoneMatch> = NoneInUnionMatch<Union, Match, ResultIfNoneMatch, ResultIfSomeMatch>;
/** Conditional that tests if at least one type in a union *does not* extend a type */
type IfSomeInUnionDoNotMatch<Union, Match, ResultIfSomeDoNotMatch, ResultIfAllMatch> = AllInUnionMatch<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch>;

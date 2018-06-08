/**
 * Design-time equivalent of Object.assign
 * Pros:
 *   overwrites properties correctly
 * Cons:
 *   strips function and construct signatures from A
 *   strips JSDoc from all props
 */
type Overlay<A, B> = IfKeysOverlap<keyof A, keyof B, Pick<A, Exclude<keyof A, keyof B>> & {[P in keyof B]: IfKeyIsOptional<B, P, B[P] | (P extends keyof A ? A[P] : never), B[P]>}, A & B>;

type IfKeyIsOptional<T, K extends keyof T, TRUE = true, FALSE = false> = {[K2 in K]: T[K2]} extends {[K2 in K]-?: T[K2]} ? FALSE : TRUE;

type IfKeysOverlap<A extends KeyOf, B extends KeyOf, TRUE = true, FALSE = false> = Extract<A, B> | Extract<B, A> extends never ? FALSE : TRUE;

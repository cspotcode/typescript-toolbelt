//#if(data.EXPORT) {
import { IfKeysOverlap, IfKeyIsOptional } from "./conditionals";
export {Overlay};
//#}

/**
 * Design-time equivalent of `Object.assign`
 * Pros:
 *   overwrites properties correctly
 * Cons:
 *   strips function and construct signatures from A
 *   strips JSDoc from all props
 */
type Overlay<A, B> = IfKeysOverlap<keyof A, keyof B, Pick<A, Exclude<keyof A, keyof B>> & {[P in keyof B]: IfKeyIsOptional<B, P, B[P] | (P extends keyof A ? A[P] : never), B[P]>}, A & B>;

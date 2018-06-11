//#if(data.EXPORT) {
export {
    AssertConstructorImplements
};
//#}

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

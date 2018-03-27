/*
 * Scenario:
 * You want to write a mixin that can only extend super-classes conforming to or extending a base class Foo.
 * You also want your mixin to call static methods of Foo, and you want to be able to pass customized
 * (overridden) implementations of those static methods.  So if ExtendedFoo overrides implementations of Foo static
 * methods, your Mixin class should be able to call ExtendedFoo's implementation.
 * 
 * For this very specific scenario, you have to do a weird song-and-dance to keep the type-checker happy.
 * Fortunately it's simple to write once you know the trick.
 
 * Related discussion: https://github.com/Microsoft/TypeScript/issues/22431#issuecomment-376550388
 */

class Foo {
    static staticMethod() {}

    constructor(a: string) {}
}

class ExtendedFoo extends Foo {
    static staticMethod() {
        console.log('doSomething was called');
    
        super.staticMethod();
    }
}

// outer function requires full FooConstructor interface, including constructor signature *and* static methods.
function MyMixin<C extends typeof Foo>(Base: C) {
    // inner function re-binds the same value to a different generic constraint, one that can be extended by a mixin
    return (<C2 extends Constructor<Foo>>(_base: C2) => {
    
        // mixin implementation
        return class MyMixin extends _base {
            static mixinStatic() {
                Base.staticMethod(); // calls ExtendedFoo implementation
            }
        }
        
    })(Base); // _base === Base
}

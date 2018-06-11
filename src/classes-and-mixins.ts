//#if(data.EXPORT) {
export {
    Constructor,
    MixinConstructorType,
    MixinType
};
export * from './classes-and-mixins-values';
//#}

/**
 * When you need a constructor, for example as the argument to a mixin function
 */
type Constructor<I = {}> = new (...args: Array<any>) => I;

/**
 * Extract constructor type of a mixin.
 * Usage: type FooConstructor = MixinConstructorType<typeof Foo>;
 */
type MixinConstructorType<MixinFunction, BaseClass = undefined> = BaseClass extends undefined ? (
    MixinFunction extends (Base: infer B) => infer C ? C : never
) : (
    MixinFunction extends (Base: BaseClass) => infer C ? C : never
);

/**
 * Extract instance type of a mixin
 * Usage: type Foo = MixinType<typeof Foo>;
 */
type MixinType<MixinFunction, BaseClass = undefined> =
    MixinConstructorType<MixinFunction, BaseClass> extends infer R
    ? R extends Constructor
    ? InstanceType<R>
    : never : never;

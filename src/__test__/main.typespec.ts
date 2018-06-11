import {
    Argument1Type,
    Argument2Type, 
    Argument3Type,
    Argument4Type,
    AssertConstructorImplements,
    Constructor,
    ConstructorArgument1Type,
    ConstructorArgument2Type,
    ConstructorArgument3Type,
    ConstructorArgument4Type,
    Dictionary,
    IfAllInUnionExtend,
    IfKeyIsOptional,
    IfKeysOverlap,
    IfNoneInUnionExtend,
    IfSomeInUnionDoNotExtend,
    IfSomeInUnionExtend,
    ReadonlyDictionary,
    KeyOf,
    MixinConstructorType,
    MixinType,
    typeOfExpression,
    Mutable,
    narrowLiterals,
    Omit,
    OmitOfType,
    Overlay,
    PickOfType,
    T,
    TI,
    TODO,
    Writable
} from '../main';

const V: never = undefined as any as never;

type Fn = (a: 'first', b: number, c: string, d?: PromiseLike<number>) => void;
// $ExpectType "first"
V as Argument1Type<Fn>;
// $ExpectType number
V as Argument2Type<Fn>;
// $ExpectType string
V as Argument3Type<Fn>;
// $ExpectType PromiseLike<number> | undefined
V as Argument4Type<Fn>;

class ClsExample {
    constructor(a: 'first', b: number, c: string, d?: PromiseLike<number>) {}
}
type Cls = typeof ClsExample;
// $ExpectType "first"
V as ConstructorArgument1Type<Cls>;
// $ExpectType number
V as ConstructorArgument2Type<Cls>;
// $ExpectType string
V as ConstructorArgument3Type<Cls>;
// $ExpectType PromiseLike<number> | undefined
V as ConstructorArgument4Type<Cls>;

// $ExpectType string | number | symbol
V as KeyOf;

// // $ExpectType 
// V as MixinConstructorType<typeof MyMixin>

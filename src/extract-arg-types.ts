import { MapKeys } from './core';

//#if(data.EXPORT) {
export {
    ArgumentTypes,
    Argument1Type,
    Argument2Type,
    Argument3Type,
    Argument4Type,
    ConstructorArgumentTypes,
    ConstructorArgument1Type,
    ConstructorArgument2Type,
    ConstructorArgument3Type,
    ConstructorArgument4Type
};
//#}

// These two are already built-in:
// ReturnType: extracts the return type of a function.
// InstanceType: extracts the instance type of a class.

// ... but what about extracting the arguments of a function?
type ArgumentTypes<Fn extends (...args: any[]) => any> = Fn extends (arg1: infer A, arg2: infer B, arg3: infer C, arg4: infer D, arg5: infer E) => any ? MapKeys<{
    [K in 1]: A
} & {
    [K in 2]: B
} & {
    [K in 3]: C
} & {
    [K in 4]: D
} & {
    [K in 5]: E
}> : any;

// ... or extracting the arguments to a constructor
type ConstructorArgumentTypes<Fn extends new (...args: any[]) => any> = Fn extends new (arg1: infer A, arg2: infer B, arg3: infer C, arg4: infer D, arg5: infer E) => any ? MapKeys<{
    [K in 1]: A
} & {
    [K in 2]: B
} & {
    [K in 3]: C
} & {
    [K in 4]: D
} & {
    [K in 5]: E
}> : any;

// Deprecated single-arg extractors
/** @deprecated Use ArgumentTypes<Fn>[1] instead */
type Argument1Type<Fn extends (arg1: any, ...rest: any[]) => any> = Fn extends (arg1: infer A, ...rest: any[]) => any ? A : any;
/** @deprecated Use ArgumentTypes<Fn>[2] instead */
type Argument2Type<Fn extends (arg1: any, arg2: any, ...rest: any[]) => any> = Fn extends (arg1: any, arg2: infer A, ...rest: any[]) => any ? A : any;
/** @deprecated Use ArgumentTypes<Fn>[3] instead */
type Argument3Type<Fn extends (arg1: any, arg2: any, arg3: any, ...rest: any[]) => any> = Fn extends (arg1: any, arg2: any, arg3: infer A, ...rest: any[]) => any ? A : any;
/** @deprecated Use ArgumentTypes<Fn>[4] instead */
type Argument4Type<Fn extends (arg1: any, arg2: any, arg3: any, arg4: any, ...rest: any[]) => any> = Fn extends (arg1: any, arg2: any, arg3: any, arg4: infer A, ...rest: any[]) => any ? A : any;

/** @deprecated Use ConstructorArgumentTypes<Fn>[1] instead */
type ConstructorArgument1Type<Fn extends new (arg1: any, ...rest: any[]) => any> = Fn extends new (arg1: infer A, ...rest: any[]) => any ? A : any;
/** @deprecated Use ConstructorArgumentTypes<Fn>[2] instead */
type ConstructorArgument2Type<Fn extends new (arg1: any, arg2: any, ...rest: any[]) => any> = Fn extends new (arg1: any, arg2: infer A, ...rest: any[]) => any ? A : any;
/** @deprecated Use ConstructorArgumentTypes<Fn>[3] instead */
type ConstructorArgument3Type<Fn extends new (arg1: any, arg2: any, arg3: any, ...rest: any[]) => any> = Fn extends new (arg1: any, arg2: any, arg3: infer A, ...rest: any[]) => any ? A : any;
/** @deprecated Use ConstructorArgumentTypes<Fn>[4] instead */
type ConstructorArgument4Type<Fn extends new (arg1: any, arg2: any, arg3: any, arg4: any, ...rest: any[]) => any> = Fn extends new (arg1: any, arg2: any, arg3: any, arg4: infer A, ...rest: any[]) => any ? A : any;

//#if(data.EXPORT) {
export {
    Argument1Type,
    Argument2Type,
    Argument3Type,
    Argument4Type,
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
type Argument1Type<Fn extends (arg1: any, ...rest: any[]) => any> = Fn extends (arg1: infer A, ...rest: any[]) => any ? A : any;
type Argument2Type<Fn extends (arg1: any, arg2: any, ...rest: any[]) => any> = Fn extends (arg1: any, arg2: infer A, ...rest: any[]) => any ? A : any;
type Argument3Type<Fn extends (arg1: any, arg2: any, arg3: any, ...rest: any[]) => any> = Fn extends (arg1: any, arg2: any, arg3: infer A, ...rest: any[]) => any ? A : any;
type Argument4Type<Fn extends (arg1: any, arg2: any, arg3: any, arg4: any, ...rest: any[]) => any> = Fn extends (arg1: any, arg2: any, arg3: any, arg4: infer A, ...rest: any[]) => any ? A : any;
// ...and so on

// ... or extracting the arguments to a constructor
type ConstructorArgument1Type<Fn extends new (arg1: any, ...rest: any[]) => any> = Fn extends new (arg1: infer A, ...rest: any[]) => any ? A : any;
type ConstructorArgument2Type<Fn extends new (arg1: any, arg2: any, ...rest: any[]) => any> = Fn extends new (arg1: any, arg2: infer A, ...rest: any[]) => any ? A : any;
type ConstructorArgument3Type<Fn extends new (arg1: any, arg2: any, arg3: any, ...rest: any[]) => any> = Fn extends new (arg1: any, arg2: any, arg3: infer A, ...rest: any[]) => any ? A : any;
type ConstructorArgument4Type<Fn extends new (arg1: any, arg2: any, arg3: any, arg4: any, ...rest: any[]) => any> = Fn extends new (arg1: any, arg2: any, arg3: any, arg4: infer A, ...rest: any[]) => any ? A : any;
// ...and so on

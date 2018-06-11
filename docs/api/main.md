# Table of contents

* [main.ts][SourceFile-0]
    * Functions
        * [AssertConstructorImplements][FunctionDeclaration-0]
        * [Writable][FunctionDeclaration-1]
        * [Mutable][FunctionDeclaration-1]
        * [narrowLiterals][FunctionDeclaration-2]
        * [narrowLiterals][FunctionDeclaration-3]
        * [narrowLiterals][FunctionDeclaration-4]
        * [typeOfExpression][FunctionDeclaration-5]
        * [typeOfExpression][FunctionDeclaration-6]
        * [T][FunctionDeclaration-7]
        * [TI][FunctionDeclaration-8]
    * Types
        * [Constructor][TypeAliasDeclaration-0]
        * [MixinConstructorType][TypeAliasDeclaration-1]
        * [MixinType][TypeAliasDeclaration-2]
        * [IfKeyIsOptional][TypeAliasDeclaration-3]
        * [IfKeysOverlap][TypeAliasDeclaration-4]
        * [IfAllInUnionExtend][TypeAliasDeclaration-5]
        * [IfNoneInUnionExtend][TypeAliasDeclaration-6]
        * [IfSomeInUnionExtend][TypeAliasDeclaration-7]
        * [IfSomeInUnionDoNotExtend][TypeAliasDeclaration-8]
        * [TODO][TypeAliasDeclaration-9]
        * [Dictionary][TypeAliasDeclaration-10]
        * [ReadonlyDictionary][TypeAliasDeclaration-11]
        * [KeyOf][TypeAliasDeclaration-12]
        * [Omit][TypeAliasDeclaration-13]
        * [PickOfType][TypeAliasDeclaration-14]
        * [OmitOfType][TypeAliasDeclaration-15]
        * [Writable][TypeAliasDeclaration-16]
        * [Mutable][TypeAliasDeclaration-16]
        * [Argument1Type][TypeAliasDeclaration-17]
        * [Argument2Type][TypeAliasDeclaration-18]
        * [Argument3Type][TypeAliasDeclaration-19]
        * [Argument4Type][TypeAliasDeclaration-20]
        * [ConstructorArgument1Type][TypeAliasDeclaration-21]
        * [ConstructorArgument2Type][TypeAliasDeclaration-22]
        * [ConstructorArgument3Type][TypeAliasDeclaration-23]
        * [ConstructorArgument4Type][TypeAliasDeclaration-24]
        * [Overlay][TypeAliasDeclaration-25]

# main.ts

## Functions

### AssertConstructorImplements

No-op class decorator that ensures the class's constructor implements a given interface.
A normal `implements` clause only asserts that instances implement the interface,
whereas this decorator makes an assertion about the constructor itself. 

EXAMPLE:

```typescript
function AssertConstructorImplements<T>(): (ctor: T) => void;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Return type**

(ctor: T) => void

----------

### Writable

Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.
Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.

```typescript
function Writable<T>(t: T): Writable;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Parameters**

| Name | Type |
| ---- | ---- |
| t    | T    |

**Return type**

[Writable][FunctionDeclaration-1]

----------

### Mutable

Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.
Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.

```typescript
function Mutable<T>(t: T): Writable;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Parameters**

| Name | Type |
| ---- | ---- |
| t    | T    |

**Return type**

[Writable][FunctionDeclaration-1]

----------

### narrowLiterals

Narrows the type of array elements to a union of literals.
Useful for building a union type from an array of strings or numbers without repetition.
Only necessary when you need the array of strings at runtime *and* you need the union type at compile-time.
Not appropriate when you only want one or the other.

Sample usage:
const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'
Narrows the type of array elements to a union of literals.
Useful for building a union type from an array of strings or numbers without repetition.
Only necessary when you need the array of strings at runtime *and* you need the union type at compile-time.
Not appropriate when you only want one or the other.

Sample usage:
const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'

```typescript
function narrowLiterals<T extends string>(array: Array<T>): Array<T>;
```

**Type parameters**

| Name | Constraint |
| ---- | ---------- |
| T    | string     |

**Parameters**

| Name  | Type     |
| ----- | -------- |
| array | Array<T> |

**Return type**

Array<T>

----------

### narrowLiterals

Narrows the type of array elements to a union of literals.
Useful for building a union type from an array of strings or numbers without repetition.
Only necessary when you need the array of strings at runtime *and* you need the union type at compile-time.
Not appropriate when you only want one or the other.

Sample usage:
const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'
Narrows the type of array elements to a union of literals.
Useful for building a union type from an array of strings or numbers without repetition.
Only necessary when you need the array of strings at runtime *and* you need the union type at compile-time.
Not appropriate when you only want one or the other.

Sample usage:
const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'

```typescript
function narrowLiterals<T extends number>(array: Array<T>): Array<T>;
```

**Type parameters**

| Name | Constraint |
| ---- | ---------- |
| T    | number     |

**Parameters**

| Name  | Type     |
| ----- | -------- |
| array | Array<T> |

**Return type**

Array<T>

----------

### narrowLiterals

Narrows the type of array elements to a union of literals.
Useful for building a union type from an array of strings or numbers without repetition.
Only necessary when you need the array of strings at runtime *and* you need the union type at compile-time.
Not appropriate when you only want one or the other.

Sample usage:
const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'
Narrows the type of array elements to a union of literals.
Useful for building a union type from an array of strings or numbers without repetition.
Only necessary when you need the array of strings at runtime *and* you need the union type at compile-time.
Not appropriate when you only want one or the other.

Sample usage:
const arrayOfLiterals = narrowLiterals(['a', 'b', 'c']);
type ABCUnion = typeof arrayOfLiterals[0]; // 'a' | 'b' | 'c'

```typescript
function narrowLiterals(array: Array<number | string>): string | number[];
```

**Parameters**

| Name  | Type                        |
| ----- | --------------------------- |
| array | Array<number &#124; string> |

**Return type**

string | number[]

----------

### typeOfExpression

Extract inferred return type of an expression *without* invoking it.
*NOTE: Almostly completely supplanted by inference in conditional types in TS2.8*

Declared return type is the same as the passed function `fn`.
However, at runtime, always returns undefined and never invokes `fn`.
TypeScript otherwise doesn't have any syntax for extracting the inferred type of an expression.

As noted, conditional types can usually do the trick.  They ignore overloaded function signatures,
so this trick may still be necessary in certain situations.

Usage:
    const __ignored = typeOfExpression(() => classFactoryFoo('bar'));
    type MyType = typeof __ignored;

```typescript
function typeOfExpression<T>(fn: (_?: any) => T): T;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Parameters**

| Name | Type           |
| ---- | -------------- |
| fn   | (_?: any) => T |

**Return type**

T

----------

### typeOfExpression

Extract inferred return type of an expression *without* invoking it.
*NOTE: Almostly completely supplanted by inference in conditional types in TS2.8*

Declared return type is the same as the passed function `fn`.
However, at runtime, always returns undefined and never invokes `fn`.
TypeScript otherwise doesn't have any syntax for extracting the inferred type of an expression.

As noted, conditional types can usually do the trick.  They ignore overloaded function signatures,
so this trick may still be necessary in certain situations.

Usage:
    const __ignored = typeOfExpression(() => classFactoryFoo('bar'));
    type MyType = typeof __ignored;

```typescript
function typeOfExpression(): void;
```

**Return type**

void

----------

### T

Write type annotations inline within nested object or array literals.
Use this to enable better Intellisense and write self-documenting code.

This is better than TS type assertions (e.g. `<MyInterface>{}`) because
type assertions allow type narrowing, which suppresses certain type errors.

For example, in the following situation, Intellisense is useless without an explicit
type annotation enabled via this function:

     const a: Dictionary<any> = {
         first: someValue,
         second: someOtherValue,
         windowShim: T<Partial<Window>>({ // We want code completion for properties of the window object
             // <- intellisense shows us setTimeout, document, alert, btoa, location, onblur, etc.
         })

```typescript
function T<V>(value: V): V;
```

**Type parameters**

| Name |
| ---- |
| V    |

**Parameters**

| Name  | Type |
| ----- | ---- |
| value | V    |

**Return type**

V

----------

### TI

Short for "Type Inferred"
Write a type requirement inline within nested object or array literals, but allow inference to
narrow the type.
Use this to enable better Intellisense and write self-documenting code.

This is better than TS type assertions (e.g. `<MyInterface>{}`) because
type assertions allow type narrowing, which suppresses certain type errors.

NOTE: usage requires an extra set of empty parentheses.  This is a generics trick.

For example, in the following situation, Intellisense is useless without an explicit
type annotation enabled via this function:

     const a: Dictionary<any> = {
         first: someValue,
         second: someOtherValue,
         windowShim: TI<Partial<Window>>()({ // We want code completion for properties of the window object
             // <- intellisense shows us setTimeout, document, alert, btoa, location, onblur, etc.
         })

```typescript
function TI<V>(): <V2 extends V>(v: V2) => V2;
```

**Type parameters**

| Name |
| ---- |
| V    |

**Return type**

<V2 extends V>(v: V2) => V2

## Types

### Constructor

When you need a constructor, for example as the argument to a mixin function

```typescript
type Constructor<I = {}> = new (args: Array<any>) => I;
```

**Type parameters**

| Name | Default |
| ---- | ------- |
| I    | {}      |

**Type**

new (args: Array<any>) => I

----------

### MixinConstructorType

Extract constructor type of a mixin.
Usage: type FooConstructor = MixinConstructorType<typeof Foo>;

```typescript
type MixinConstructorType<MixinFunction, BaseClass = undefined> = MixinConstructorType<MixinFunction, BaseClass>;
```

**Type parameters**

| Name          | Default   |
| ------------- | --------- |
| MixinFunction |           |
| BaseClass     | undefined |

**Type**

MixinConstructorType<MixinFunction, BaseClass>

----------

### MixinType

Extract instance type of a mixin
Usage: type Foo = MixinType<typeof Foo>;

```typescript
type MixinType<MixinFunction, BaseClass = undefined> = MixinConstructorType<MixinFunction, BaseClass> extends Constructor<{}> ? InstanceType<MixinConstr...;
```

**Type parameters**

| Name          | Default   |
| ------------- | --------- |
| MixinFunction |           |
| BaseClass     | undefined |

**Type**

MixinConstructorType<MixinFunction, BaseClass> extends Constructor<{}> ? InstanceType<MixinConstr...

----------

### IfKeyIsOptional

Conditionally check if property of an interface is optional

```typescript
type IfKeyIsOptional<T, K extends keyof T, TRUE = true, FALSE = false> = IfKeyIsOptional<T, K, TRUE, FALSE>;
```

**Type parameters**

| Name  | Constraint | Default |
| ----- | ---------- | ------- |
| T     |            |         |
| K     | keyof T    |         |
| TRUE  |            | true    |
| FALSE |            | false   |

**Type**

IfKeyIsOptional<T, K, TRUE, FALSE>

----------

### IfKeysOverlap

Conditionally check if any keys exist in both unions.

```typescript
type IfKeysOverlap<T extends string | number | symbol, U extends string | number | symbol, TRUE = true, FALSE = false> = IfKeysOverlap<T, U, TRUE, FALSE>;
```

**Type parameters**

| Name  | Constraint                         | Default |
| ----- | ---------------------------------- | ------- |
| T     | string &#124; number &#124; symbol |         |
| U     | string &#124; number &#124; symbol |         |
| TRUE  |                                    | true    |
| FALSE |                                    | false   |

**Type**

IfKeysOverlap<T, U, TRUE, FALSE>

----------

### IfAllInUnionExtend

Conditional that tests if all types in a union extend a type 

```typescript
type IfAllInUnionExtend<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch> = IfAllInUnionExtend<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch>;
```

**Type parameters**

| Name                   |
| ---------------------- |
| Union                  |
| Match                  |
| ResultIfAllMatch       |
| ResultIfSomeDoNotMatch |

**Type**

IfAllInUnionExtend<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch>

----------

### IfNoneInUnionExtend

Conditional that tests if all types in a union *do not* extend a type 

```typescript
type IfNoneInUnionExtend<Union, Match, ResultIfNoneMatch, ResultIfSomeDoMatch> = IfNoneInUnionExtend<Union, Match, ResultIfNoneMatch, ResultIfSomeDoMatch>;
```

**Type parameters**

| Name                |
| ------------------- |
| Union               |
| Match               |
| ResultIfNoneMatch   |
| ResultIfSomeDoMatch |

**Type**

IfNoneInUnionExtend<Union, Match, ResultIfNoneMatch, ResultIfSomeDoMatch>

----------

### IfSomeInUnionExtend

Conditional that tests if at least one type in a union extends a type 

```typescript
type IfSomeInUnionExtend<Union, Match, ResultIfSomeMatch, ResultIfNoneMatch> = IfNoneInUnionExtend<Union, Match, ResultIfNoneMatch, ResultIfSomeMatch>;
```

**Type parameters**

| Name              |
| ----------------- |
| Union             |
| Match             |
| ResultIfSomeMatch |
| ResultIfNoneMatch |

**Type**

[IfNoneInUnionExtend][TypeAliasDeclaration-6]<Union, Match, ResultIfNoneMatch, ResultIfSomeMatch>

----------

### IfSomeInUnionDoNotExtend

Conditional that tests if at least one type in a union *does not* extend a type 

```typescript
type IfSomeInUnionDoNotExtend<Union, Match, ResultIfSomeDoNotMatch, ResultIfAllMatch> = IfAllInUnionExtend<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch>;
```

**Type parameters**

| Name                   |
| ---------------------- |
| Union                  |
| Match                  |
| ResultIfSomeDoNotMatch |
| ResultIfAllMatch       |

**Type**

[IfAllInUnionExtend][TypeAliasDeclaration-5]<Union, Match, ResultIfAllMatch, ResultIfSomeDoNotMatch>

----------

### TODO

When you're too lazy or rushed to use proper type declarations, use TODO
This is different from `any` because you *can* apply more appropriate typings;
you just choose not to due to time constraints.

```typescript
type TODO = any;
```

**Type**

any

----------

### Dictionary

Simple object-backed Dictionary interface.  Slightly less verbose than declaring a subscripting signature.

```typescript
type Dictionary<T> = Record<string, T>;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Type**

Record<string, T>

----------

### ReadonlyDictionary

```typescript
type ReadonlyDictionary<T> = Readonly<Record<string, T>>;
```

**Type parameters**

| Name |
| ---- |
| T    |

**Type**

Readonly<Record<string, T>>

----------

### KeyOf

Backwards-compatible widest type returned by `keyof`
TS2.9 expanded `keyof` to include numeric and Symbol properties and index signatures;
previously it was limited to `string`

```typescript
type KeyOf = keyof any;
```

**Type**

keyof any

----------

### Omit

```typescript
type Omit<T, K extends string | number | symbol> = Pick<T, Exclude<keyof T, K>>;
```

**Type parameters**

| Name | Constraint                         |
| ---- | ---------------------------------- |
| T    |                                    |
| K    | string &#124; number &#124; symbol |

**Type**

Pick<T, Exclude<keyof T, K>>

----------

### PickOfType

Picks only the properties of a certain type.
For example, you can filter an interface to include only properties that are numbers.
Requires TS 2.8

```typescript
type PickOfType<Object, T> = {
    [FilteredProp extends { [P extends keyof Object]: Object[P] extends T ? P : never }[keyof Object]]: Object[FilteredProp]
};
```

**Type parameters**

| Name   |
| ------ |
| Object |
| T      |

**Type**

{ [FilteredProp extends { [P extends keyof Object]: Object[P] extends T ? P : never }[keyof Object]]: Object[FilteredProp] }

----------

### OmitOfType

Opposite of PickOfType
Excludes properties that extend a type; includes all others.

```typescript
type OmitOfType<Object, T> = {
    [FilteredProp extends { [P extends keyof Object]: Object[P] extends T ? never : P }[keyof Object]]: Object[FilteredProp]
};
```

**Type parameters**

| Name   |
| ------ |
| Object |
| T      |

**Type**

{ [FilteredProp extends { [P extends keyof Object]: Object[P] extends T ? never : P }[keyof Object]]: Object[FilteredProp] }

----------

### Writable

Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.
Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.

```typescript
type Writable<T, K extends keyof T = keyof T> = {
    readonly [L extends K]: T[L]
};
```

**Type parameters**

| Name | Constraint | Default |
| ---- | ---------- | ------- |
| T    |            |         |
| K    | keyof T    | keyof T |

**Type**

{ readonly [L extends K]: T[L] }

----------

### Mutable

Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.
Sometimes you want to write a class with a readonly property (for the sake of public API)
but you (rarely) need to privately mutate that property.
Use this trick:

     Writable(this).normallyReadonlyProp = newValue;
     // or, if you really want to avoid the function call:
     (this as Writable<this>).normallyReadonlyProp = newValue;

Aliased as `Mutable` because that sounds more like the counterpart to Immutable, a term
preferred in certain programming circles.

```typescript
type Mutable<T, K extends keyof T = keyof T> = {
    readonly [L extends K]: T[L]
};
```

**Type parameters**

| Name | Constraint | Default |
| ---- | ---------- | ------- |
| T    |            |         |
| K    | keyof T    | keyof T |

**Type**

{ readonly [L extends K]: T[L] }

----------

### Argument1Type

```typescript
type Argument1Type<Fn extends (arg1: any, rest: any[]) => any> = Argument1Type<Fn>;
```

**Type parameters**

| Name | Constraint                      |
| ---- | ------------------------------- |
| Fn   | (arg1: any, rest: any[]) => any |

**Type**

Argument1Type<Fn>

----------

### Argument2Type

```typescript
type Argument2Type<Fn extends (arg1: any, arg2: any, rest: any[]) => any> = Argument2Type<Fn>;
```

**Type parameters**

| Name | Constraint                                 |
| ---- | ------------------------------------------ |
| Fn   | (arg1: any, arg2: any, rest: any[]) => any |

**Type**

Argument2Type<Fn>

----------

### Argument3Type

```typescript
type Argument3Type<Fn extends (arg1: any, arg2: any, arg3: any, rest: any[]) => any> = Argument3Type<Fn>;
```

**Type parameters**

| Name | Constraint                                            |
| ---- | ----------------------------------------------------- |
| Fn   | (arg1: any, arg2: any, arg3: any, rest: any[]) => any |

**Type**

Argument3Type<Fn>

----------

### Argument4Type

```typescript
type Argument4Type<Fn extends (arg1: any, arg2: any, arg3: any, arg4: any, rest: any[]) => any> = Argument4Type<Fn>;
```

**Type parameters**

| Name | Constraint                                                       |
| ---- | ---------------------------------------------------------------- |
| Fn   | (arg1: any, arg2: any, arg3: any, arg4: any, rest: any[]) => any |

**Type**

Argument4Type<Fn>

----------

### ConstructorArgument1Type

```typescript
type ConstructorArgument1Type<Fn extends new (arg1: any, rest: any[]) => any> = ConstructorArgument1Type<Fn>;
```

**Type parameters**

| Name | Constraint                          |
| ---- | ----------------------------------- |
| Fn   | new (arg1: any, rest: any[]) => any |

**Type**

ConstructorArgument1Type<Fn>

----------

### ConstructorArgument2Type

```typescript
type ConstructorArgument2Type<Fn extends new (arg1: any, arg2: any, rest: any[]) => any> = ConstructorArgument2Type<Fn>;
```

**Type parameters**

| Name | Constraint                                     |
| ---- | ---------------------------------------------- |
| Fn   | new (arg1: any, arg2: any, rest: any[]) => any |

**Type**

ConstructorArgument2Type<Fn>

----------

### ConstructorArgument3Type

```typescript
type ConstructorArgument3Type<Fn extends new (arg1: any, arg2: any, arg3: any, rest: any[]) => any> = ConstructorArgument3Type<Fn>;
```

**Type parameters**

| Name | Constraint                                                |
| ---- | --------------------------------------------------------- |
| Fn   | new (arg1: any, arg2: any, arg3: any, rest: any[]) => any |

**Type**

ConstructorArgument3Type<Fn>

----------

### ConstructorArgument4Type

```typescript
type ConstructorArgument4Type<Fn extends new (arg1: any, arg2: any, arg3: any, arg4: any, rest: any[]) => any> = ConstructorArgument4Type<Fn>;
```

**Type parameters**

| Name | Constraint                                                           |
| ---- | -------------------------------------------------------------------- |
| Fn   | new (arg1: any, arg2: any, arg3: any, arg4: any, rest: any[]) => any |

**Type**

ConstructorArgument4Type<Fn>

----------

### Overlay

Design-time equivalent of `Object.assign`
Pros:
   overwrites properties correctly
Cons:
   strips function and construct signatures from A
   strips JSDoc from all props

```typescript
type Overlay<A, B> = IfKeysOverlap<keyof A, keyof B, Pick<A, Exclude<keyof A, keyof B>> & { [P extends keyof B]: IfKeyIsOptional<B, P, B[P] | (P extends keyof A ? A[P] : never), B[P]> }, A & B>;
```

**Type parameters**

| Name |
| ---- |
| A    |
| B    |

**Type**

[IfKeysOverlap][TypeAliasDeclaration-4]<keyof A, keyof B, Pick<A, Exclude<keyof A, keyof B>> & { [P extends keyof B]: [IfKeyIsOptional][TypeAliasDeclaration-3]<B, P, B[P] | (P extends keyof A ? A[P] : never), B[P]> }, A & B>

[SourceFile-0]: main.md#maints
[FunctionDeclaration-0]: main.md#assertconstructorimplements
[FunctionDeclaration-1]: main.md#mutable
[FunctionDeclaration-1]: main.md#mutable
[FunctionDeclaration-1]: main.md#mutable
[FunctionDeclaration-1]: main.md#mutable
[FunctionDeclaration-2]: main.md#narrowliterals
[FunctionDeclaration-3]: main.md#narrowliterals
[FunctionDeclaration-4]: main.md#narrowliterals
[FunctionDeclaration-5]: main.md#typeofexpression
[FunctionDeclaration-6]: main.md#typeofexpression
[FunctionDeclaration-7]: main.md#t
[FunctionDeclaration-8]: main.md#ti
[TypeAliasDeclaration-0]: main.md#constructor
[TypeAliasDeclaration-1]: main.md#mixinconstructortype
[TypeAliasDeclaration-2]: main.md#mixintype
[TypeAliasDeclaration-3]: main.md#ifkeyisoptional
[TypeAliasDeclaration-4]: main.md#ifkeysoverlap
[TypeAliasDeclaration-5]: main.md#ifallinunionextend
[TypeAliasDeclaration-6]: main.md#ifnoneinunionextend
[TypeAliasDeclaration-7]: main.md#ifsomeinunionextend
[TypeAliasDeclaration-6]: main.md#ifnoneinunionextend
[TypeAliasDeclaration-8]: main.md#ifsomeinuniondonotextend
[TypeAliasDeclaration-5]: main.md#ifallinunionextend
[TypeAliasDeclaration-9]: main.md#todo
[TypeAliasDeclaration-10]: main.md#dictionary
[TypeAliasDeclaration-11]: main.md#readonlydictionary
[TypeAliasDeclaration-12]: main.md#keyof
[TypeAliasDeclaration-13]: main.md#omit
[TypeAliasDeclaration-14]: main.md#pickoftype
[TypeAliasDeclaration-15]: main.md#omitoftype
[TypeAliasDeclaration-16]: main.md#mutable
[TypeAliasDeclaration-16]: main.md#mutable
[TypeAliasDeclaration-17]: main.md#argument1type
[TypeAliasDeclaration-18]: main.md#argument2type
[TypeAliasDeclaration-19]: main.md#argument3type
[TypeAliasDeclaration-20]: main.md#argument4type
[TypeAliasDeclaration-21]: main.md#constructorargument1type
[TypeAliasDeclaration-22]: main.md#constructorargument2type
[TypeAliasDeclaration-23]: main.md#constructorargument3type
[TypeAliasDeclaration-24]: main.md#constructorargument4type
[TypeAliasDeclaration-25]: main.md#overlay
[TypeAliasDeclaration-3]: main.md#ifkeyisoptional
[TypeAliasDeclaration-4]: main.md#ifkeysoverlap
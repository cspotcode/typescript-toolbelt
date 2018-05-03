// Thanks to @mkulke for this: https://github.com/Microsoft/TypeScript/issues/13923#issuecomment-373836516

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonly<T> =
  T extends ReadonlyArray<any>
  ? DeepReadonlyArray<T[number]>
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

///////////////////

export type primitive = string | number | boolean | undefined | null

type DeepMutable<T> = T extends primitive ? T : {
    -readonly [Key in keyof T]: DeepMutable<T[Key]>;
};

// type DeepReadonly<T> =
//     (
//         T extends object
//         ? {
//             readonly [Key in keyof T]: DeepReadonly<T[Key]>;
//         }
//         : T
//     );

type DeepPartial<T> = T extends object ? {
    [Key in keyof T]?: DeepPartial<T[Key]>;
} : T;

type DeepRequired<T> = T extends object ? {
    [Key in keyof T]-?: DeepRequired<T[Key]>;
} : T;

type DeepNonNullable<T> = T extends object ? {
    [Key in keyof T]: DeepNonNullable<T[Key]>;
} : NonNullable<T>;

export type DeepReadonly<T> = T extends primitive ? T : DeepReadonlyObject<T>
export type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

export type A = DeepMutable<ReadonlyArray<'hello'>>;
const a = null as any as A;


/** Optional chaining operator semantics */
function OCO(value, prop1, prop2, prop3, prop4) { 
    if(value == null) return undefined; 
    const value1 = value[prop1]; 
    if(value1 == null || prop2 == null) return undefined; 
    const value2 = value1[prop2]; 
    if(value2 == null || prop3 == null) return undefined; 
    const value3 = value2[prop3]; 
    if(value3 == null || prop4 == null) return undefined; 
    const value4 = value3[prop4]; 
    return value4; 
}

export interface ObjectBuilder<T> {
    value: {[K in keyof T]: T[K]};
    <K extends string, V>(key: K, value: V): ObjectBuilder<ReplaceProps<T, {[Key in K]: V}>>;
}

function buildObject<T extends object>(value: T = {}): ObjectBuilder<T> {
    function builder(key, value) {
        value[key] = value;
        return builder;
    }
    builder.value = value;
    return builder as any;
}

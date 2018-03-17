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

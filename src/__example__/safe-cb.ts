// TODO convert this to a couple lib helpers

/**
 * A contrived example of a node-style async API
 * Passes a number to callback (unless an error occurs)
 */
function getInstancesInReadyStatus(cb: (err: undefined | Error, value: undefined | number) => void): void {
    // TODO implementation
}

/*
 * USAGE:
 * Instead of passing a bare callback to a function, pass a callback wrapped in safeCb()
 * Your callback now accepts a single argument that wraps both error and return value.
 * The typechecker will ensure you properly handle errors, because the return value will
 * be inaccessible until you prove it's not an error (and vice versa)
 */
getInstancesInReadyStatus(safeCb((ret) => {
    ret.error // type error: no such property (because maybe it's not an error)
    ret.value // type error: no such property (because maybe it's not a success)
    if (ret.isError) {
        // We have proven it's an error
        return console.log(ret.error);
        ret.value; // type error: no such property "value" (this is not a return value)
    }
    // Return statement above tells typechecker `ret` cannot possibly be error; must be success value.
    ret.error // type error: no such property "error" (this is a successful return)
    ret.value.toPrecision(); // this is fine!  Value is proven to be a number
}));

/**
 * Make a callback safe; it enforces proper error checking and won't even allow
 * you to access the return value without first checking for an error
 */
function safeCb<E, V>(cb: (ret: WrappedErrorOrValue<E, V>) => void): (err: E, value: V) => void {
    return (err: E, value: V) => {
        return cb(wrapCbArgs(err, value));
    }
}
function wrapCbArgs<E, V>(err: E, value: V) {
    return {
        err,
        value,
        isError: !!err
    } as any as WrappedErrorOrValue<E, V>;
}
interface WrappedError<E> {
    isError: true,
    error: NonNullable<E>;
}
interface WrappedValue<V> {
    isError: false,
    value: Exclude<V, undefined>;
}
type WrappedErrorOrValue<E, V> = WrappedError<E> | WrappedValue<V>;

function assertType<T>(value: T): void {}

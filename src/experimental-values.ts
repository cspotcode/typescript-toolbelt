//#if(data.EXPORT) {
export {
    OCO
}
//#}

/**
 * Optional chaining operator semantics
 * 
 * TODO copy description I wrote elsewhere.
 * 
 * TODO make it work for ...rest args with an `any` fallback.
 */
function OCO<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(value: T, prop1: K1, prop2: K2, prop3: K3, prop4: K4): T[K1][K2][K3][K4];
function OCO<T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(value: T, prop1: K1, prop2: K2, prop3: K3): T[K1][K2][K3];
function OCO<T, K1 extends keyof T, K2 extends keyof T[K1]>(value: T, prop1: K1, prop2: K2): T[K1][K2];
function OCO<T, K1 extends keyof T>(value: T, prop1: K1): T[K1];
function OCO(value: any, prop1: any, prop2?: any, prop3?: any, prop4?: any) {
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

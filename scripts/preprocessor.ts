import {template, pick, mapValues} from 'lodash'; 
import * as Path from 'path';
import * as fs from 'fs';

function TI<V>() {
    return <V2 extends V>(v: V2) => v;
}

const neverMatch = /^(b)/;

export function preprocess(filePath: string, sourceText: string, data: object = {}) {
    const lib = new Lib(filePath, data);

    const preamble = `//#__grantLexicalAccess({__getAcc() {return __p}, __setAcc(s) {__p = s}});\n`;

    const compiled = template(preamble + sourceText, {
        escape: neverMatch,
        interpolate: neverMatch,
        evaluate: /(?:\r?\n|^)\s*\/\/+\s*#(.*?)(?=\r?\n|$)/,
        variable: 'data',
        imports: lib.exposedMethods
    });
    return compiled(data || {});
}

class Lib {
    constructor(private filePath: string, private data: object) {}

    private __exposedMethodNames = TI<Array<keyof this>>()([
        'capture',
        'print',
        'include',
        // 'If',
        // 'uncommentIf',
        '__grantLexicalAccess'
    ]);
    exposedMethods = mapValues(pick(this, ...this.__exposedMethodNames), v => v.bind(this) as typeof v);

    capture(cb: () => void): string {
        const __acc = this.__getAcc();
        this.__setAcc('');
        cb();
        const captured = this.__getAcc();
        this.__setAcc(__acc);
        return captured;
    }

    uncommentIf(conditional: boolean, cb: () => void) {

    }

    If(conditional: boolean, cb: () => void) {

    }

    print(s: string) {
        this.__setAcc(this.__getAcc() + s);
    }

    include(relativePath: string, data: object = this.data) {
        const targetPath = Path.resolve(Path.dirname(this.filePath), relativePath);
        const targetSourceText = fs.readFileSync(targetPath, 'utf8');
        this.print(preprocess(targetPath, targetSourceText, data));
    }

    __getAcc!: () => string;
    __setAcc!: (s: string) => void;

    __grantLexicalAccess(fns: Pick<Lib, '__getAcc' | '__setAcc'>) {
        Object.assign(this, fns);
    }
}

export function preprocessFile(filePath: string) {
    return preprocess(filePath, fs.readFileSync(filePath, 'utf8'));
}

fs.writeFileSync('out/global.d.ts', preprocessFile('./src/global.d.ts'));

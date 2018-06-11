import {expect} from 'chai';

import {
    AssertConstructorImplements,
    Mutable,
    Writable,
    narrowLiterals,
    T,
    TI,
    typeOfExpression
} from '../main';

describe('runtime behavior > ', () => {
    it('AssertConstructorImplements', () => {
        expect((AssertConstructorImplements() as any)()).to.equal(undefined);
        expect(AssertConstructorImplements()((class {}))).to.equal(undefined);
    });

    // Assert that a function is identity function at runtime
    function isIdentity(Impl: Function) {
        const a = {};
        const b: any[] = [];
        expect(Impl(a)).to.equal(a);
        expect(Impl(b)).to.equal(b);
        expect(Impl(global)).to.equal(global);
        expect(Impl(undefined)).to.equal(undefined);
        expect(Impl(null)).to.equal(null);
        expect(Impl(123)).to.equal(123);
    }

    // Assert that a function always returns a value no matter what
    function alwaysReturns(Impl: Function, ret: any) {
        const a = {};
        const b: any[] = [];
        expect(Impl()).to.equal(ret);
        expect(Impl(a)).to.equal(ret);
        expect(Impl(b)).to.equal(ret);
        expect(Impl(a, b)).to.equal(ret);
        expect(Impl(global)).to.equal(ret);
        expect(Impl(undefined)).to.equal(ret);
        expect(Impl(null)).to.equal(ret);
        expect(Impl(123)).to.equal(ret);
    }

    it('Mutable', () => {
        isIdentity(Mutable);
    });
    it('Writable', () => {
        isIdentity(Writable);
    });

    it('narrowLiterals', () => {
        const a = [1, 2, 3];
        const b = ['a', 'b', 'c'];
        isIdentity(narrowLiterals);
        expect(narrowLiterals(a)).to.equal(a);
        expect(narrowLiterals(b)).to.equal(b);
    });

    it('T', () => {
        isIdentity(T);
    });
    it('TI', () => {
        alwaysReturns(TI, T);
    });

    it('typeOfExpression', () => {
        function neverExecute() {
            throw new Error('this should never execute');
        }
        typeOfExpression(neverExecute);
    });
});

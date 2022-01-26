import { ap, chain, id, map, Maybe, none, of, some } from './definition';

describe('Maybe', () => {
    const f: (a: number) => number = (a: number) => a + 1;
    const g: (a: number) => number = (a: number) => a + 2;
    const Ff = some(f);
    const Fg = some(g);
    const Cf: (a: number) => Maybe<number> = (a: number) => some(f(a));
    const Cg: (a: number) => Maybe<number> = (a: number) => some(g(a));

    const a = 1;
    const Fa: Maybe<number> = some(1);
    const FNone = none();

    describe('is a Functor', () => {
        test.each([Fa, FNone])('identity law', (Fa) => {
            const left = map(Fa)(id);
            const right = Fa;

            expect(left).toEqual(right);
        });

        test.each([Fa, FNone])('composition law', (Fa) => {
            const left = map(Fa)(a => f(g(a)));
            const right = map(map(Fa)(g))(f);

            expect(left).toEqual(right);
        });
    });

    describe('is an Apply', () => {
        test.each([Fa, FNone])('composition law', (Fa) => {
            const composed:
                (number) =>
                    (f: (a: number) => number) =>
                        (g: (a: number) => number) =>
                            number = a => f => g => g(f(a));

            const left = ap(Fg)(ap(Ff)(map(Fa)(composed)));
            const right = ap(ap(Fa)(Ff))(Fg);

            expect(left).toEqual(right);
        });
    });

    describe('is an Applicative', () => {
        test.each([Fa, FNone])('identity', (Fa) => {
            const left = ap(Fa)(of(id));
            const right = Fa;

            expect(left).toEqual(right);
        });

        test.each([a])('homomorphism', (a) => {
            const left = ap(of(a))(of(f));
            const right = of(f(a));

            expect(left).toEqual(right);
        });

        test.each([Ff, FNone])('interchange', (Ff) => {
            const left = ap(of(a))(Ff);
            const right = ap(Ff)(of(f => f(a)));

            expect(left).toEqual(right);
        });
    });

    describe('is a Chain', () => {
        test.each([Fa, FNone])('associativity', (v) => {
            const left = chain(chain(v)(Cf))(Cg);
            const right = chain(v)(a => chain(Cf(a))(Cg));

            expect(left).toEqual(right);
        });
    });

    describe('is a Monad', () => {
        test('left identity', () => {
            const left = chain(of(a))(Cf);
            const right = Cf(a);

            expect(left).toEqual(right);
        });

        test.each([Fa, FNone])('right identity', (Fa) => {
            const left = chain(Fa)(of);
            const right = Fa;

            expect(left).toEqual(right);
        });
    });
});

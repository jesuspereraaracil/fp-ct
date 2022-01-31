import { ap, chain, cons, empty, List, map, of } from './definition';

const id = <A> (a: A) => a;

describe('List', () => {
    const f: (a: number) => number = (a) => a + 1;
    const g: (a: number) => number = (a) => a + 2;

    const Ff: List<(a: number) => Number> = cons(f, empty());
    const Fg: List<(a: number) => Number> = cons(g, empty());

    const Cf: (a: number) => List<number> = (a) => cons(f(a), empty());
    const Cg: (a: number) => List<number> = (a) => cons(g(a), empty());

    const a = 1;
    const Fa: List<number> = cons(1, empty());
    const FNone = empty();

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

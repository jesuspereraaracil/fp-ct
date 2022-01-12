import { Monoid } from './definition';

describe('monoid laws', () => {

    const monoid: Monoid<any> = undefined as Monoid<any>;

    const a = 2;
    const b = 4;
    const c = 8;

    test('associativity', () => {
        const left = monoid.concat(a)(monoid.concat(b)(c));
        const right = monoid.concat(monoid.concat(a)(b))(c);

        expect(left).toEqual(right);
    });

    test('identity', () => {
        const left = monoid.concat(a)(monoid.empty);
        const right = monoid.concat(monoid.empty)(a);

        expect(left).toEqual(right);
        expect(left).toEqual(a);
        expect(right).toEqual(a);
    });
});

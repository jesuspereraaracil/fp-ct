import { Semigroup } from './definition';

describe('Semigroup laws', () => {

    // TODO change me
    const semigroup: Semigroup<any> = undefined as Semigroup<any>;

    const a = 2;
    const b = 4;
    const c = 8;

    // concat(a)(concat(b)(c)) === concat(concat(a)(b))(c)
    test('associativity', () => {
        const left = semigroup.concat(a)(semigroup.concat(b)(c));
        const right = semigroup.concat(semigroup.concat(a)(b))(c);

        expect(left).toEqual(right);
    });
});

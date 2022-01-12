import { Group } from './definition';

describe('group laws', () => {

    const group: Group<any> = undefined as Group<any>;

    const a = 2;
    const b = 4;
    const c = 8;

    // concat(a)(concat(b)(c)) === concat(concat(a)(b))(c)
    test('associativity', () => {
        const left = group.concat(a)(group.concat(b)(c));
        const right = group.concat(group.concat(a)(b))(c);

        expect(left).toEqual(right);
    });

    // concat(a)(empty) === a === concat(empty)(a)
    test('identity', () => {
        const left = group.concat(a)(group.empty);
        const right = group.concat(group.empty)(a);

        expect(left).toEqual(right);
        expect(left).toEqual(a);
        expect(right).toEqual(a);
    });

    // concat(inverse(a))(a) === empty === concat(a)(inverse(a))
    test('inverse', () => {
        const left = group.concat(group.inverse(a))(a);
        const right = group.concat(a)(group.inverse(a));

        expect(left).toEqual(right);
        expect(left).toEqual(group.empty);
        expect(right).toEqual(group.empty);
    });
});

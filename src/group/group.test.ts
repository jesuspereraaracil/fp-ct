import { Group } from './definition';

describe('group laws', () => {

    const group: Group<any> = undefined as Group<any>;

    const a = 2;
    const b = 4;
    const c = 8;

    test('associativity', () => {
        const left = group.concat(a)(group.concat(b)(c));
        const right = group.concat(group.concat(a)(b))(c);

        expect(left).toEqual(right);
    });

    test('identity', () => {
        const left = group.concat(a)(group.empty);
        const right = group.concat(group.empty)(a);

        expect(left).toEqual(right);
        expect(left).toEqual(a);
        expect(right).toEqual(a);
    });

    test('inverse', () => {
        const left = group.concat(group.inverse(a))(a);
        const right = group.concat(a)(group.inverse(a));

        expect(left).toEqual(right);
        expect(left).toEqual(group.empty);
        expect(right).toEqual(group.empty);
    });
});

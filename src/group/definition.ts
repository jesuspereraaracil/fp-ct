import { Monoid } from '../monoid/definition';

export interface Group<A> extends Monoid<A> {
    readonly inverse: (a: A) => A;
}

// TODO implement groups

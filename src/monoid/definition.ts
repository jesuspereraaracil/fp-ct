import { Semigroup } from '../semigroup/definition';

export interface Monoid<A> extends Semigroup<A> {
    readonly empty: A;
}

// TODO implement monoids

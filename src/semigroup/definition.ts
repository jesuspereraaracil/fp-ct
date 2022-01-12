export interface Semigroup<A> {
    concat: (x: A) => (y: A) => A;
}

// TODO implement semigroups

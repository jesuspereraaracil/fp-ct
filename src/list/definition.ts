// data types
export type Cons<A> = { tag: 'CONS', value: A, next: List<A> }
export type Empty = { tag: 'EMPTY' }
export type List<A> = Cons<A> | Empty

// constructors
export const cons = <A> (a: A, next: List<A>): Cons<A> => ({ tag: 'CONS', value: a, next });
export const empty = (): Empty => ({ tag: 'EMPTY' });

// type guards
export const isEmpty = <A> (fa: List<A>): fa is Empty =>
    fa.tag === 'EMPTY';

// Functor
// map :: Fa -> (a -> b) -> Fb
export const map = <A, B> (fa: List<A>) => (f: (a: A) => B): List<B> =>
    isEmpty(fa) ? fa : cons<B>(
        f(fa.value), map<A, B>(fa.next)(f));

// Applicative
// of :: a -> Fa
export const of = <A> (a: A): List<A> =>
    cons(a, empty());

// Monad
// flatten :: F F a -> F a
export const flatten = <A> (ffa: List<List<A>>): List<A> =>
    reduce<List<A>, List<A>>(ffa,
        (next, acc) => concat(acc)(next), empty());

export const chain = <A, B> (fa: List<A>) => (f: (a: A) => List<B>): List<B> =>
    flatten(map<A, List<B>>(fa)(f));

// Applicative
// ap :: Fa -> F(a -> b) -> Fb
export const ap = <A, B>(fa: List<A>) => (ff: List<(a: A) => B>): List<B> =>
    chain<(a: A) => B, B>(ff)((f) => map<A, B>(fa)(f))

// Semigroup
// concat :: Fa -> Fa -> Fa
export const concat = <A> (fa: List<A>) => (fb: List<A>): List<A> =>
    isEmpty(fa) ? fb :
        isEmpty(fb)
            ? fb
            : cons(fa.value, concat(fa.next)(fb));

// Foldable
// reduce :: Fa -> B
export const reduce = <A, B> (fa: List<A>, f: (next: A, acc: B) => B, first: B): B =>
    isEmpty(fa)
        ? first
        : reduce(fa.next, f, f(fa.value, first));

// Aux functions
// reverse :: Fa -> Fa
export const reverse = <A> (fa: List<A>): List<A> =>
    reduce(fa, (next, acc) => cons(next, acc), empty() as List<A>);

// toString: Fa -> string
export const toString = <A> (fa: List<A>): string =>
    `[${reduce(fa, (a: A, b: string) => b + String(a), '')}]`;

// Examples
const fa = cons('1', cons('2', cons('3', empty())));
const f = (a: string): List<string> => cons(a, cons('b', empty()));
const ffb: List<List<string>> = map<string, List<string>>(fa)(f);
const fb: List<string> = chain<string, string>(fa)(f);

console.log(toString(ffb));
console.log(toString(fb));

// data types
export type Some<A> = { tag: 'SOME', value: A }
export type None = { tag: 'NONE' }
export type Maybe<A> = Some<A> | None

// identity
export const id = <A> (a: A) => a;

// constructors
export const some = <A> (a: A): Some<A> => ({ tag: 'SOME', value: a });
export const none = (): None => ({ tag: 'NONE' });

// type guards
export const isNone = <A> (fa: Maybe<A>): fa is None => fa.tag === 'NONE';

// Functor
// map :: Fa -> (a -> b) -> Fb
export const map = <A, B> (fa: Maybe<A>) => (f: (a: A) => B): Maybe<B> => isNone(fa) ? fa : some(
    f(fa.value));

// TODO
// lift :: (a -> b) -> (Fa -> Fb)

// Apply
// ap :: Fa -> F(a -> b) -> Fb
export const ap = <A, B> (fa: Maybe<A>) => (ff: Maybe<(a: A) => B>): Maybe<B> => isNone(fa)
    ? fa
    : isNone(ff) ? ff : of(ff.value(fa.value));

// Applicative
// of :: a -> Fa
export const of = <A> (a: A): Maybe<A> => (a === null || a === undefined) ? none() : some(a);

// Functor derived
// TODO
// mapFromAp

// Chain
// chain :: Fa -> (a -> Fb) -> Fb
export const chain = <A, B> (fa: Maybe<A>) => (f: ((a: A) => Maybe<B>)): Maybe<B> => isNone(fa)
    ? fa
    : f(fa.value);

// TODO
// flatten :: FFa -> Fa
// TODO
// flattenFromChain
// TODO
// chainFromFlatten

// Functor derived
// TODO
// mapFromChain :: Fa -> (a -> b) -> Fb

// Apply derived
// TODO
// apFromChain :: Fa -> F(a -> b) -> Fb

/*
 How to use our Maybe monad

 you can use
    npm run start
 to execute this code
 */

const a: Maybe<string> = some('Hello');

const f = (v: string): number => v.length;
const g: (v: number) => number = v => v * 2;

const fb: Maybe<number> = map<string, number>(a)(f);
const fc: Maybe<number> = map<number, number>(fb)(g);
console.log(fc);

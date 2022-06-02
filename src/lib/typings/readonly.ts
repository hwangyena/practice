export const a = 1;

type Foo = { readonly bar: number; readonly bas: string };

let foo: Foo = { bar: 123, bas: 'abc' };

//Readonly
type Moo = { num: number; str: string };
type MooReadonly = Readonly<Moo>;

let moo: MooReadonly = { num: 123, str: 'abc' };
moo.num = 456; //ERROR!

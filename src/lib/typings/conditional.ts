type IdLabel = { label: number };
type NameLabel = { label: string };

type StrOrNum<T extends number | string> = T extends number ? IdLabel : NameLabel;

export const createLabel = <T extends number | string>(idOrName: T): StrOrNum<T> => {
  throw 'unimplemented';
};

const a = createLabel('TS'); // a: NameLabel
const b = createLabel(123); // b: IdLabel

///

// type MessageOf<T extends { message: unknown }> = T['message'];

// type EmailMessage = MessageOf<{ message: string }>;
// type PhoneMessage = MessageOf<{ message: number }>;

// const email: EmailMessage = 'x@test.com'; // only string
// const phone: MessageOf<{hello: string}> = 12341234; // only number

type MessageOf<T> = T extends { message: unknown } ? T['message'] : undefined;

type EmailMessage = MessageOf<{ message: string }>;
type DogMessage = MessageOf<{ dog: () => void }>;

const people: EmailMessage = 'hello';
const dog: DogMessage = undefined;

///

type GetReturnType<T> = T extends (...args: never[]) => infer Return ? Return : never;

const number: GetReturnType<() => number> = 123;
const string: GetReturnType<(a: string) => string[]> = ['return'];

///

type ToArray<T> = T extends unknown ? T[] : never;
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

const stringToArr: ToArray<string> = ['hello'];
const StrArrOrNumArr: ToArray<string | number> = ['hello']; // string[] or number[]
const StrArrOrNumArr2: ToArrayNonDist<string | number> = ['hello', 1, 2]; // (string | number)[]

///

type A = { a: string };
type B = A & { b: number };

const better = (value: A | B) => {
  if ('b' in value) {
    // GOOD: type guard
    console.log('value is b:', value);
  } else console.log('value is a: ', value);
};

// type GetT<T> = T extends B ? B : A;
// const method = <T>(value: GetT<T> | undefined) => {
//   console.log('value', value?.b); //ERROR!
// };

const test: B = { a: 'a', b: 1 };

///

type GetReturn<T> = T extends (...args: never[]) => infer R ? R : never;
type Num = GetReturn<() => number>;

type ReturnPromise<T> = T extends (...args: infer A) => infer R ? (...args: A) => Promise<R> : T;
type Promisify<T> = { [P in keyof T]: ReturnPromise<T[P]> };

type PromisifyItem = {
  id: string;
  getItem: () => string;
};

const item: Promisify<PromisifyItem> = { getItem: async () => 'hey', id: 'hello?' };

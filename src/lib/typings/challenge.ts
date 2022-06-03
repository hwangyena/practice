export const a = 1;

// 1. MyPick
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type Test = {
  name: string;
  age: number;
  phone: string;
};

const customPick: MyPick<Test, 'age' | 'name'> = { age: 123, name: '' };

// 2. Readonly
interface Todo {
  title: string;
  description: string;
}

type MyReadonly<T> = { readonly [P in keyof T]: T[P] };

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

export const a = 1;

// 1. MyPick
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type Test = {
  name: string;
  age: number;
  phone: string;
};

const customPick: MyPick<Test, 'age' | 'name'> = { age: 123, name: '' };

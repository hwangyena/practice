export const utility = {};

// 1. Partial
type Info = {
  email: string;
  address: string;
};

type MyInfo = Partial<Info>;
const yena: MyInfo = { address: 'abcd', email: 'hey' };
const gildong: MyInfo = { address: 'abcd' };
const koko: MyInfo = {};

// 2. Record
type Animal = {
  age: number;
};
type CatName = 'kitty' | 'mong';

const cats: Record<CatName, Animal> = {
  kitty: { age: 1 },
  mong: { age: 2 },
};

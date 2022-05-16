export const utility = {};

type Info = {
  email: string;
  address: string;
};

type MyInfo = Partial<Info>;
const yena: MyInfo = { address: 'abcd', email: 'hey' };
const gildong: MyInfo = { address: 'abcd' };
const koko: MyInfo = {};

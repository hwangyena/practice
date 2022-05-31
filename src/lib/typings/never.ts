export const a = 10;

type Str = string | never;
const StringValue: Str = 'only string';

type Never = string & never;
// const NeverValue: Never = 'abc'; //ERROR!

// 1. 허용할 수 없는 함수 매개변수에 제한을 가한다.
type OnlyStr<T> = T extends string ? string : never;
type OnlyNumber<T> = T extends number ? number : never;
const paramNever = <T>(value: OnlyStr<T> | OnlyNumber<T>) => {
  return value;
};

paramNever<string>('abcde');
paramNever<number>(1);

// 2. switch, if-else 문의 모든 상황을 보장한다.
function unknownColor(color: never): never {
  throw new Error('unknown Color');
}

type Color = 'red' | 'green' | 'blue';

const getColor = (color: Color) => {
  switch (color) {
    case 'blue':
      return 'blue';
    case 'red':
      return 'red';
    case 'green':
      return 'green';
    default:
      unknownColor(color);
  }
};

// 3. 타이핑을 부분적으로 허용하지 않는다.
type A = { a: string; b?: never };
type B = { b: string; a?: never };

const aorb = (value: A | B): typeof value => value;
aorb({ a: 'abcde' });

// 4. 의도하지 않은 API 사용을 방지한다.
type MyCache<T, R> = {
  put?: (val: T) => boolean;
  get(): R;
};

type ReadOnlyCache<R> = MyCache<never, R>;

const read: ReadOnlyCache<string> = { get: () => 'cache' };

// 5. 이론적으로 도달할 수 없는 분기를 표기할 때
type Foo = 'foo';
type IsFoo<T> = T extends infer R ? (R extends Foo ? true : false) : never;

const isFoo: IsFoo<Foo> = true;
const isNotFoo: IsFoo<string> = false;

//6. 유니언 타입에서 멤버 필터링
type Boo = {
  name: 'Boo';
  age: 20;
};
type Ba = {
  name: 'Ba';
  age: 29;
};

type All = Boo | Ba;

type ExtractTypeByName<T, G> = T extends { name: G } ? T : never;
const Ba: ExtractTypeByName<All, 'Ba'> = { name: 'Ba', age: 29 };
// const Noone: ExtractTypeByName<All, 'Co'> = // never!

//7. 매핑된 타입의 키 필터링
type ObjectKey<Obj extends Object, Value> = {
  [Key in keyof Obj as Value extends Obj[Key] ? Key : never]: Obj[Key];
};

type Person = {
  name: string;
  age: number;
  address: string;
};

const personAge: ObjectKey<Person, string> = { address: '', name: 'boo' };

//8. 제어 흐름 분석의 좁은 타입
function throwError(): never {
  throw new Error();
}

const isValidString = (value: String | undefined) => {
  value ?? throwError();
  return value;
};

//9. 호환되지 않는 타입의 불가능한 교차 타입 표시
type Res = number & string;

//실제 never 타입인지 확인하기
type IsNever<T> = [T] extends [never] ? true : false;
type Res1 = IsNever<never>; // 'true'
type Res2 = IsNever<number>; // 'false'

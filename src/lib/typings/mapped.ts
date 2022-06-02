type OnlyNumberString = {
  [key: string]: number | string;
};

const test: OnlyNumberString = {
  b: 1,
  c: 'hello',
};

type OnlyBoolean<T> = {
  [Property in keyof T]: boolean;
};

type MethodType = {
  darkMode: () => void;
  onClick: () => void;
};

const bool: OnlyBoolean<MethodType> = {
  darkMode: false,
  onClick: true,
};

// Mapping Modifiers
// 1. read only
type CreateMutable<T> = {
  -readonly [P in keyof T]: T[P];
};
type LockedAccount = {
  readonly id: string;
  readonly pwd: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

let nonUser: UnlockedAccount = { id: 'visitor', pwd: '1234' };
nonUser.id = 'unknown'; // can Change

//2. optional
type Concrete<T> = { [P in keyof T]-?: T[P] };
type UnknownUser = { id: string; name?: string };
type User = Concrete<UnknownUser>;

const bob: User = { id: 'bob123', name: 'bob' };

// Key Remapping via `as`
//1. create new type with template literal
type Getters<T> = { [P in keyof T as `get${Capitalize<string & P>}`]: T[P] };
type Person = { name: string; age: number };
type LazyPerson = Getters<Person>;

const tom: LazyPerson = { getName: 'tom', getAge: 31 };

//2. filter out keys
type RemoveHeightField<T> = { [P in keyof T as Exclude<P, 'height'>]: T[P] };
interface Rect {
  width: number;
  height: number;
}
const line: RemoveHeightField<Rect> = { width: 5 };

//+) Exclude vs Omit
type ObjectType = { abc: string; def: string; xyz: number };
type MappedWithOmit = Omit<ObjectType, 'abc'>;

type UnionType = 'abc' | 'def' | 'xyz';
type MappedWithExclude = Exclude<UnionType, 'def'>;
const excludeWithUnion: MappedWithExclude = 'abc';

type MappedTypeByOmit = { [P in keyof Omit<ObjectType, 'abc'>]: ObjectType[P] };
type MappedTypeByExclude = { [P in keyof Exclude<ObjectType, 'abc'>]: ObjectType[P] };

export const omitTest: MappedTypeByOmit = { def: '', xyz: 123 };
export const excludeTest: MappedTypeByExclude = { abc: '', def: 'aa', xyz: 123 }; //ERROR!

//3. unions of any type
type EventConfig<Event extends { kind: string }> = {
  [P in Event as P['kind']]: (value: P) => number;
};

type SquareEvent = { kind: 'square'; width: number; height: number };
type CircleEvent = { kind: 'circle'; radius: number };

type Events = EventConfig<SquareEvent | CircleEvent>;

const event: Events = {
  square: ({ width, height }) => width * height,
  circle: ({ radius }) => radius * 3.14,
};

// Further Exploration (mapping with conditional type)
type CuteAnimal<T> = { [P in keyof T]: T[P] extends { cute: true } ? true : false };

type Animals = {
  dog: { cute: true; gender: 'male' };
  cat: { cute: true; gender: 'female' };
  turtle: { cute: false; gender: 'male' };
};

const animals: CuteAnimal<Animals> = { cat: true, dog: true, turtle: false };

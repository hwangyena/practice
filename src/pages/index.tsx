import type { NextPage } from 'next';
import Head from 'next/head';
import { useReducer, useRef, useState } from 'react';
import { GlobalStore } from '../store';
import styles from '../styles/Home.module.css';

interface IProfileUpdateAction {
  type: 'UPDATE' | 'DELETE' | 'RESET';
  name: string;
  value: string;
}

const profileReducer = (state: UserType, action: IProfileUpdateAction) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'DELETE':
      return {
        ...state,
        [action.name]: '',
      };
    default:
      return state;
  }
};

const profileInitial: UserType = {
  email: '',
  gender: 'male',
  id: 1,
  name: '',
  status: '',
};

/**
 *
 * @param value<string> 비교 값
 * @param target<string> 비교 대상(password)
 */
const checkConsecutive = (value: string, target: string) => {
  for (let i = 0; i < value.length - 3; i++) {
    const tmp = value.slice(i, i + 3);
    if (new RegExp(`${tmp}`).test(target)) return true;
  }
  return false;
};

/** page */
const Home: NextPage = () => {
  const store = GlobalStore.useContainer();

  const id = 'react123';
  const tel = '010-1234-5678';

  const [profile, dispatchProfile] = useReducer(profileReducer, profileInitial);
  const [pwd, setPwd] = useState('');
  const [pwdConfim, setPwdConfirm] = useState('');

  const inputPwd = useRef<HTMLInputElement>(null);

  const [validation, setValidation] = useState<{ message: string; pass: boolean }>({ message: '', pass: true });

  const onChangeProfile = (name: keyof UserType, value: string) => {
    dispatchProfile({ name, type: 'UPDATE', value });
  };

  /** 비밀번호 설정 실패 */
  const failPassword = (message: string) => {
    setValidation({
      message,
      pass: false,
    });
    inputPwd.current?.focus();
  };

  const onValidPassword = () => {
    /**
     * 영문 대문자/소문자/숫자/특수문자 중 2종류 이상을 조합하여 최소 10자리 이상
     * 영문 대문자/소문자/숫자/특수문자 중 3종류 이상을 조합하여 최소 8자리 이상
     * -> 대,소,특 or 소,숫,특 or 대,숫,특
     * 연속적인 숫자 3개 사용 불가 (아마도 동일한 3개 숫자일 듯)
     * 전화번호, 아이디와 4자리 연속 동일한 비밀번호 사용 불가
     * 직전 2회 입력한 비밀번호 사용 불가
     */
    if (!pwd) {
      failPassword('비밀번호를 입력해주세요.');
      return;
    }
    if (pwd !== pwdConfim) {
      failPassword('비밀번호가 동일하지 않습니다.');
      return;
    }

    let combination = 0;
    if (pwd.search(/[a-z]/) !== -1) {
      combination += 1;
    }
    if (pwd.search(/[A-Z]/) !== -1) {
      combination += 1;
    }
    if (pwd.search(/\d/) !== -1) {
      combination += 1;
    }
    if (pwd.search(/[.?!@#$%^&*₩'"_-]/) !== -1) {
      combination += 1;
    }

    if ((combination === 2 && pwd.length < 10) || combination < 2 || pwd.length < 8) {
      failPassword('비밀번호는 대/소문자, 숫자, 특수문자를 혼합하여 10자리 이상으로 설정해주세요.');
      return;
    }
    if (/(\d)\1{2}/.test(pwd)) {
      failPassword('비밀번호에 연속된 3자리 숫자를 사용할 수 없습니다.');
      return;
    }
    if (checkConsecutive(id, pwd)) {
      failPassword('아이디, 전화번호와 4자리 연속 동일한 비밀번호는 사용할 수 없습니다.');
      return;
    }

    setValidation({ message: '', pass: true });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Chat Practice</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="mb-3">
          <h3>globalstate using unstated-next</h3>
          {store.visible && <div>hello</div>}
          <button onClick={() => store.toogleVisible()}>click me!</button>
        </section>
        <section>
          <h3>useReducer</h3>
          <div className="flex gap-3 flex-col w-[150px]">
            <label className="flex whitespace-nowrap gap-3">
              이름
              <input type="text" value={profile.name} onChange={(e) => onChangeProfile('name', e.target.value)} />
            </label>
            <label className="flex whitespace-nowrap gap-3">
              이메일
              <input type="text" value={profile.email} onChange={(e) => onChangeProfile('email', e.target.value)} />
            </label>
            <label className="flex whitespace-nowrap gap-3">
              성별
              <input type="text" value={profile.gender} onChange={(e) => onChangeProfile('gender', e.target.value)} />
            </label>
          </div>
        </section>
        <hr className="my-3" />
        <section>
          <h3 className="mt-3 mb-2">plabot 비밀번호 초기화</h3>
          <div className="flex flex-col mb-3">
            <span>
              <b>아이디:</b> {id}
            </span>
            <span>
              <b>전화번호:</b> {tel}
            </span>
          </div>
          <div className="w-80 flex flex-col gap-2">
            <div className="flex gap-2 flex-col">
              <input
                value={pwd}
                // type="password"
                ref={inputPwd}
                onChange={(e) => setPwd(e.target.value.replace(/[^a-zA-Z0-9.?!@#$%^&*₩'"_-]/, ''))}
                placeholder="새로운 비밀번호"
                className={`w-full p-1 placeholder:text-slate-400 border-slate-500 ${
                  validation.pass ? 'border-slate-500' : 'border-red-400'
                } `}
                autoComplete="false"
              />
              <input
                type="text"
                value={pwdConfim}
                // type="password"
                onChange={(e) => setPwdConfirm(e.target.value.replace(/[^a-zA-Z0-9.?!@#$%^&*₩'"_-]/, ''))}
                placeholder="비밀번호 확인"
                className={`w-full p-1 placeholder:text-slate-400 border-slate-500 ${
                  validation.pass ? 'border-slate-500' : 'border-red-400'
                } `}
                autoComplete="false"
              />
            </div>

            {!validation.pass && <div className="text-red-400">{validation.message}</div>}
            <button className={`p-1 rounded-md bg-slate-500 text-white`} onClick={onValidPassword}>
              확인
            </button>
          </div>

          <div>길이: {pwd.length}</div>
        </section>
      </main>
    </div>
  );
};

export default Home;

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { BackButton } from 'src/components/common';
import { useUser } from 'src/lib/endpoints/employees';
import { UsePageLoad } from 'src/lib/hooks';
import { GlobalStore } from 'src/store';

const PopUp = dynamic(() => import('src/components/common/pop-up'));

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ message: string; error: boolean }>({ message: '', error: false });

  const router = useRouter();
  const validLogin = loginId && password;

  const { login } = useUser();
  const { moveUrl, visible, onCancel } = GlobalStore.useContainer();

  const showModal = useRef(false);

  UsePageLoad(() => showModal.current);

  /** login */
  const onLogin = async () => {
    if (!loginId && !password) {
      return;
    }
    // if (!EMAIL_REX.test(loginId)) {
    //   setError({ message: '이메일 형식이 맞지않습니다.', error: true });
    //   return;
    // }

    const res = await login(loginId, password);

    if (res.error) {
      setError({ message: res.error.data.message, error: true });
      return;
    }
    //로그인 성공
    setError((p) => ({ ...p, error: false }));
    router.push('/dashboard');
  };

  useEffect(() => {
    if (loginId || password) {
      showModal.current = true;
    }
  }, [loginId, password]);

  return (
    <>
      <BackButton />
      <main className="grid place-items-center flex-col h-screen">
        <div>
          <h2 className="text-center">로그인</h2>
          <div className="flex flex-col mt-5">
            <div className={`w-full border ${error.error && 'border-red-500'}`}>
              <input
                className="p-2 w-full border-0 border-b border-slate-200 focus:outline-0"
                placeholder="이메일을 입력해주세요."
                autoComplete="off"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
              <input
                className="p-2 w-full border-0  focus:outline-0"
                placeholder="비밀번호를 입력해주세요."
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error.error && <span className="text-red-500">{error.message}</span>}
            <button onClick={() => router.push('find-pwd')} className="underline justify-end w-fit  self-end">
              비밀번호를 잊으셨나요?
            </button>
            <button
              className={`mt-5 rounded-md p-3 ${!validLogin ? 'bg-slate-100 cursor-auto' : 'bg-slate-400 text-white'}`}
              onClick={onLogin}
            >
              로그인
            </button>
          </div>
        </div>
      </main>
      <PopUp
        {...{ onCancel, visible, closeable: false }}
        footer={
          <div className="flex w-full rounded-b-sm">
            <button className="p-5 rounded-bl-sm grow text-center text-slate-400 font-bold" onClick={onCancel}>
              취소
            </button>
            <button
              onClick={() => {
                showModal.current = false;
                router.push(moveUrl.current);
              }}
              className="p-5 rounded-br-sm grow text-center bg-slate-400 font-bold text-white"
            >
              이동
            </button>
          </div>
        }
      >
        <p className="whitespace-pre px-8">{`진행중인 내용이 삭제됩니다.\n정말 이동하시겠습니까?`}</p>
      </PopUp>
    </>
  );
}

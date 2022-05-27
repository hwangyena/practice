import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BackButton } from 'src/components/common';
import { EMAIL_REX } from 'src/lib/regex';

const PopUp = dynamic(() => import('src/components/common/pop-up'));

export default function FindPwd() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<{ message: string; error: boolean }>({ message: '', error: false });
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const onEmail = () => {
    if (!email) return;
    if (!EMAIL_REX.test(email)) {
      setError({ message: '이메일 형식이 맞지않습니다.', error: true });
      return;
    }
    setError((p) => ({ ...p, error: false }));
    setVisible(true);
  };

  const onCancel = () => {
    setVisible(false);
    router.push('/login');
  };

  return (
    <>
      <BackButton />
      <main className="grid place-items-center flex-col h-screen">
        <div className="w-[400px]">
          <h2 className="mb-3 text-center">비밀번호 찾기</h2>
          <pre className="text-slate-500 mb-5">{`비밀번호를 잊으셨나요?\n가입하신 이메일 주소로 임시 비밀번호를 보내드립니다.`}</pre>

          <label>
            이메일
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`p-2 w-full focus:outline-0 ${error.error && 'border-red-400'}`}
              placeholder="이메일 주소를 입력해주세요."
            />
          </label>
          {error.error && <div className="text-red-500">이메일 주소를 확인해주세요.</div>}
          <button className="mt-5 rounded-md p-3 bg-slate-400 w-full text-white" onClick={onEmail}>
            임시 비밀번호 보내기
          </button>
        </div>
      </main>
      <PopUp
        {...{ visible, onCancel, closeable: false }}
        footer={
          <button onClick={onCancel} className="w-full p-3 bg-slate-300">
            확인
          </button>
        }
      >
        <div className="flex flex-col">
          <span>임시 비밀번호를 발송하였습니다.</span>
        </div>
      </PopUp>
    </>
  );
}

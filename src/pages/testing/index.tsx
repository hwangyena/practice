import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

export default function TestingPage({ test }: InferGetStaticPropsType<typeof getStaticProps>) {
  const handleOpen = () => {
    window.open('/testing/a', 'test', 'width=500, height=500');
  };

  return (
    <div>
      <h1>SSG TEST</h1>
      {test}
      <button onClick={handleOpen} className="bg-slate-300 mr-5">
        새로운 창 띄우기
      </button>
      <Link href="/testing/a" passHref>
        <a target="_blank" className="bg-slate-300 p-2">
          새 탭 띄우기
        </a>
      </Link>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('SSG Test', params);
  // const { router, EmployeeInvitation,InvitationError } = useCheckInvitation(context.params);

  return {
    props: {
      test: 'hey',
    },
  };
};

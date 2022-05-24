import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function A() {
  const router = useRouter();

  useEffect(() => {
    router.push('/testing/a/?counter=10', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    console.log('router changed -->', router.asPath);
  }, [router]);

  return (
    <div>
      <h1>New window</h1>
    </div>
  );
}

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TabMenu from 'src/components/common/tabmenu';

const { Tab } = TabMenu;

export default function A() {
  const router = useRouter();

  const [value, setValue] = useState('waiting');

  useEffect(() => {
    router.push('/testing/a/?counter=10', undefined, { shallow: true });
  }, []);

  useEffect(() => {
    console.log('router changed -->', router.asPath);
  }, [router]);

  return (
    <div>
      <h1>New window</h1>
      <TabMenu
        value={value}
        onChangeTab={(v) => setValue(v)}
        tabOptions={[
          { label: '대기중', value: 'waiting' },
          { label: '진행중', value: 'running' },
          { label: '완료', value: 'done' },
        ]}
      >
        <Tab value="waiting">
          <h1>대기중</h1>
          <p>대기중입니다..</p>
        </Tab>
        <Tab value="running">
          <h1>진행중</h1>
        </Tab>
        <Tab value="done">
          <h1>완료</h1>
        </Tab>
      </TabMenu>
    </div>
  );
}

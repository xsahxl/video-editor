import { getToken } from '@/utils/common';
import { Flex, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Page() {
  const route = useRouter();
  useEffect(() => {
    const token = getToken();
    route.push(token ? '/video' : '/login');
  }, []);
  return (
    <Flex align='center' justify='center' className='h-screen'>
      <Spin />
    </Flex>
  );
}

Page.getLayout = (page: React.ReactNode) => page;

export default Page;

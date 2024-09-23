import { getToken } from '@/utils/common';
import { Flex, Spin } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Page() {
  return <div>index</div>;
}

Page.getLayout = (page: React.ReactNode) => page;

export default Page;

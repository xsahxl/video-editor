import { useState } from 'react';
import { Input, Form, Button, Divider } from 'antd';
import { UserAddOutlined, LockOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { useRouter } from 'next/router';
import * as sevice from '@/pages/api/login';
import { setLocalStorage } from '@/utils/common';

type FieldType = {
  username?: string;
  password?: string;
};

function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    try {
      const { access_token, token_type } = await sevice.login({
        json: { phone: values.username, code: values.password },
      });
      setLocalStorage('token', `${token_type} ${access_token}`);
      router.push('/users');
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-8 rounded-md shadow-md w-96'>
        <div>后台管理系统</div>
        <Divider />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input prefix={<UserAddOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='密码' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

Page.getLayout = (page: React.ReactNode) => page;

export default Page;

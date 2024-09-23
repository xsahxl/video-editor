import React, { useState, PropsWithChildren, FC, useEffect } from 'react';
import { LogoutOutlined, UserAddOutlined, SettingFilled, GiftFilled, CustomerServiceFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import { removeLocalStorage } from '@/utils/common';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/video',
    label: '图片+文字',
    icon: <UserAddOutlined />,
  },
  {
    key: '/excalidraw',
    label: 'excalidraw',
    icon: <UserAddOutlined />,
  },
];

interface IProps extends PropsWithChildren {}

const App: FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setSelectedKeys([router.pathname]);
  }, [router.pathname]);

  const onLoginOut = () => {
    removeLocalStorage('token');
    router.push('/login');
  };

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {collapsed ? null : (
          <div
            style={{
              color: '#fff',
              padding: '24px 28px 16px',
              fontWeight: 600,
              fontSize: 18,
              lineHeight: '18px',
            }}
          >
            视频编辑器
          </div>
        )}
        <Menu
          theme='dark'
          selectedKeys={selectedKeys}
          mode='inline'
          items={items}
          onClick={(item) => {
            router.push(item.key);
          }}
        />
      </Sider>
      <Layout style={{ height: '100vh' }}>
        <Header
          style={{ background: '#f0f2f5', flexDirection: 'row-reverse', padding: '0 16px' }}
          className='flex justify-between items-center'
        ></Header>
        <Content style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default App;

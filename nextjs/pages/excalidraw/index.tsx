import { Button, Flex, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const Excalidraw = dynamic(async () => (await import('@excalidraw/excalidraw')).Excalidraw, {
  ssr: false,
});
export default function App() {
  const [ExcalidrawModule, setExcalidrawModule] = useState<typeof import('@excalidraw/excalidraw') | null>(null);
  useEffect(() => {
    import('@excalidraw/excalidraw').then((module) => {
      setExcalidrawModule(module);
    });
  }, []);

  if (!ExcalidrawModule) {
    return (
      <Flex align='center' justify='center' className='h-screen'>
        <Spin />
      </Flex>
    );
  }
  const { WelcomeScreen, MainMenu, Footer, Sidebar } = ExcalidrawModule;
  const UIOptions = {};
  return (
    <div className='h-full'>
      <Excalidraw
        langCode='zh-CN'
        UIOptions={UIOptions}
        renderTopRightUI={() => {
          return <Button onClick={() => window.alert('This is dummy top right UI')}>Click me</Button>;
        }}
        renderCustomStats={() => <p style={{ color: '#70b1ec', fontWeight: 'bold' }}>Dummy stats will be shown here</p>}
      >
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Hints.HelpHint />
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Heading>自定义欢迎页面</WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLoadScene />
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>
        <Sidebar name='custom'>
          <Sidebar.Header>标题</Sidebar.Header>
          <Sidebar.Tabs>
            <div className='pl-3 pr-3 h-full'>内容</div>
          </Sidebar.Tabs>
        </Sidebar>
        <Footer>
          <Sidebar.Trigger
            name='custom'
            style={{
              marginLeft: '0.5rem',
              background: '#70b1ec',
              color: 'white',
            }}
          >
            Toggle Custom Sidebar
          </Sidebar.Trigger>
        </Footer>
      </Excalidraw>
    </div>
  );
}

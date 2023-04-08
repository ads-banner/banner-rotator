import { LogoutOutlined } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme, Space, FloatButton, Modal } from 'antd';
import useLoggedIn from './hooks'

import FormLink from 'components/FormLink'
import MyLinks from 'components/MyLinks'

import './style.css'

const { Header, Content, Footer, Sider } = Layout;

const LoggedIn = ({ currentUser, setIsLogged, setIsLoading }) => {
  const {
    handleToggleShowAddLink,
    handleShowAddLink,
    showAddLink,
    handleLogoff,
    link,
    setLink,
  } = useLoggedIn({ setIsLogged, setIsLoading })
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Space className="rb-logged-in" direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className="rb-sider-user">
          <img src={currentUser.photoURL} referrerPolicy="no-referrer" style={{ maxWidth: '80px', borderRadius: '100px'}} />
          <h3>Seja bem vindo,<br />{currentUser.displayName}!</h3>
        </Sider>

        <Layout>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={[
                { key: 1, label: 'Home' },
                { key: 2, label: 'Criar', onClick: handleShowAddLink },
              ]}
            />
            <FloatButton
              icon={<LogoutOutlined />}
              description="Sair"
              shape="square"
              type="primary"
              onClick={handleLogoff}
              style={{
                right: 20,
                bottom: 'auto',
                top: 12
              }}
            />
            { link && 
              <FormLink
                user={currentUser}
                showAddLink={showAddLink}
                handleToggleShowAddLink={handleToggleShowAddLink}
                link={link}
              />
            }
          </Header>

          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[{title:'Home'}, {title: 'Banners'}]}
            />

            <div style={{ background: colorBgContainer }}>
              <MyLinks user={currentUser} setLink={setLink} />
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Banner Rotator ©2023 Created by Palloi Hofmann</Footer>
        </Layout>
      </Layout>
    </Space>
  )
}

export default LoggedIn
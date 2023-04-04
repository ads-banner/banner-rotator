import './style.css'
import useLoggedOut from './hooks'
import logo from '../../logo-banner-rotator.png'
import { Layout, Space, Typography, Button } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Footer, Content } = Layout

const LoggedOut = ({ setIsLogged }) => {
  const { handleLogin } = useLoggedOut({ setIsLogged })  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ textAlign: 'center' }}>
        <Space className="rb-logged-out" direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
          <img src={logo} className="rb-logo" />
          <Title>SEJA BEM VINDO AO BANNER ROTATOR</Title>
          <Text>Gerencie e divulgue sua lista de propagandas, parcerias, sorteios, rifas e muito mais.</Text>
          <Button
            type="primary"
            onClick={handleLogin}
            shape="round"
            icon={<LoginOutlined />}
            size="large"
          >
            ENTRAR NO SISTEMA
          </Button>
        </Space>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Banner Rotator ©2023 Created by Palloi Hofmann</Footer>
    </Layout>
)}

export default LoggedOut
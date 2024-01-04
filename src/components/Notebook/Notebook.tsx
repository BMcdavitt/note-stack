import { Layout } from 'antd'
import Chapters from './Chapters/Chapters'
import Page from './Page/Page'
import PageHeader from './PageHeader/PageHeader'

const { Header, Sider, Content } = Layout

const Notebook = () => {
  return (
    <Layout style={{ padding: '10px' }}>
      <Header style={{ backgroundColor: '#fff', borderRadius: '15px', height: '10vh', padding: 0 }}>
        <PageHeader />
      </Header>
      <Layout style={{ paddingTop: '10px' }}>
        <Sider style={{ borderRadius: '15px', marginRight: '10px' }}>
          <Chapters />
        </Sider>

        <Content>
          <Page />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Notebook

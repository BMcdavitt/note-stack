import { Col, Row, Layout } from 'antd'
import Chapters from './Chapters/Chapters'
import Page from './Page/Page'
import PageHeader from './PageHeader/PageHeader'

const Notebook = () => {
  return (
    <Layout>
      <Row>
        <Col span={24}>
          <PageHeader />
        </Col>
      </Row>
      <Row wrap={false} gutter={[16, 16]} style={{ margin: '1vh' }}>
        <Col flex="250px">
          <Chapters />
        </Col>
        <Col flex="auto">
          <Page />
        </Col>
      </Row>
    </Layout>
  )
}

export default Notebook

import { Col, Row } from 'antd'
import Chapters from './Chapters/Chapters'
import Page from './Page/Page'

const Notebook = () => {
  return (
    <Row wrap={false} gutter={[16, 16]} style={{ margin: '1vh' }}>
      <Col flex="250px">
        <Chapters />
      </Col>
      <Col flex="auto">
        <Page />
      </Col>
    </Row>
  )
}

export default Notebook

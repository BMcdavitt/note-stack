import { Col, Row } from 'antd'
import Chapters from './Chapters/Chapters'

const Notebook = () => {
  return (
    <Row gutter={[16, 16]} style={{ margin: '1vh' }}>
      <Col flex="250px">
        <Chapters />
      </Col>
      <Col flex="auto">
        <Chapters />
      </Col>
    </Row>
  )
}

export default Notebook

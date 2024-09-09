import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import { Flex } from 'antd'

const ChapterToolbar = () => {
  return (
    <div
      style={{
        height: '5vh',
      }}
    >
      <Flex align="center" justify="right" gap="5px" style={{ height: '100%', paddingRight: '10px' }}>
        <DeleteOutlined />
        <FileAddOutlined />
      </Flex>
    </div>
  )
}
export default ChapterToolbar

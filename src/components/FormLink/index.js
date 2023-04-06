import useFormLink from './hooks'

import {
  Button,
  Form,
  Input,
  Modal,
} from 'antd';

const FormLink = ({ user, showAddLink, handleToggleShowAddLink }) => {
  const { handleAddLink } = useFormLink({ user, handleToggleShowAddLink })

  return <Modal
    title="Modal 1000px width"
    centered
    footer={null}
    open={showAddLink}
    onCancel={handleToggleShowAddLink}
    width={768}
  >
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      onFinish={handleAddLink}
      size="large"
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="URL pública">
        <Input />
      </Form.Item>
      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Modal>
}

export default FormLink
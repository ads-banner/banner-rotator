import useFormLink from './hooks'

import {
  Button,
  Form,
  Input,
  Modal,
} from 'antd';

const FormLink = ({ user, showAddLink, handleToggleShowAddLink, link }) => {
  // console.log('Formlink', link)
  const [form] = Form.useForm();
  const {
    handleAddLink,
    handleUpdateLink,
    initialValues,
  } = useFormLink({ user, handleToggleShowAddLink, link, form })
  const isNew = initialValues.title

  return <Modal
    title={isNew ? 'Cadastrar Link' : 'Editar Link'}
    centered
    footer={null}
    open={showAddLink}
    onCancel={handleToggleShowAddLink}
    width={768}
  >
    <Form
      form={form}
      // labelCol={{
      //   span: 4,
      // }}
      // wrapperCol={{
      //   span: 14,
      // }}
      // layout="horizontal"
      // initialValues={initialValues}
      // onFinish={handleUpdateLink}
      // size="large"
      name="style-editor-form"
      onFinish={isNew ? handleAddLink : handleUpdateLink}
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.Item name="url" label="URL pública">
        <Input />
      </Form.Item>
      <Form.Item label=" ">
        <Button type="primary" htmlType="submit">
          {isNew ? 'CADASTRAR' : 'SALVAR'}
        </Button>
      </Form.Item>
    </Form>
  </Modal>
}

export default FormLink
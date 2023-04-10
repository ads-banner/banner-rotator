import useFormLink from './hooks'

import {
  Button,
  Form,
  Input,
  Modal,
  Upload,
} from 'antd'

import { PlusOutlined } from '@ant-design/icons'

const FormLink = ({ user, showAddLink, handleToggleShowAddLink, link }) => {
  const {
    handleAddLink,
    handleOnBeforeUpload,
    handleRemoveMidia,
    handleUpdateLink,
    initialValues = {},
    isNew,
    isSaving,
    uploadFiles,
  } = useFormLink({ user, handleToggleShowAddLink, link })

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return <Modal
    title={isNew ? 'Cadastrar Link' : 'Editar Link'}
    centered
    footer={null}
    open={showAddLink}
    onCancel={handleToggleShowAddLink}
    width={768}
  >
    <Form
      layout="vertical"
      size="large"
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
      <Form.Item label="Mídias">
        <Upload
          listType="picture-card"
          fileList={uploadFiles}
          beforeUpload={handleOnBeforeUpload}
          onRemove={handleRemoveMidia}
        >
          {uploadFiles.length >= 6 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item label="">
        <Button type="primary" htmlType="submit" loading={isSaving}>
          {isNew ? 'CADASTRAR' : 'SALVAR'}
        </Button>
      </Form.Item>
    </Form>
  </Modal>
}

export default FormLink
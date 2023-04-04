import { getDatabase, ref, child, push, get, set, update } from 'firebase/database'

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

const FormLink = ({ user }) => {
  // const app = getApp()
  const db = getDatabase()
  const dbRef = ref(db)

  return <Form
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 14,
    }}
    layout="horizontal"
    // initialValues={{
    // }}
    onValuesChange={(attrs) => { console.log('form', { attrs }) }}
    onFinish={(attrs) => { 

      const updates = {};
      updates['/links/' + user.uid] = {
        link1: {
          title: attrs.title,
          url: attrs.url,
        }
      }

      push(dbRef, updates)
      // const teste= ;
      // console.log('teste', teste)
    }}
    size="large"
    style={{
      // maxWidth: 600,
    }}
  >
    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="url" label="URL pública" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label=" ">
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
}

export default FormLink
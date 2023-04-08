import useMyLinks from './hooks'
import { Table } from 'antd'

const MyLinks = ({ user, setLink }) => {
  const { columns, isLoading, links } = useMyLinks({ user, setLink })

  return <Table
      columns={columns}
      dataSource={links}
      loading={isLoading}
      pagination={false}
    />
}

export default MyLinks
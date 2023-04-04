import useMyLinks from './hooks'

import { Table } from 'antd'

const MyLinks = ({ user }) => {
  const { columns, isLoading, links } = useMyLinks({ user })

  return <Table
      columns={columns}
      dataSource={links}
      loading={isLoading}
      pagination={false}
    />
}

export default MyLinks
import { getDatabase, ref, onValue, update } from 'firebase/database'
import { getApp } from 'firebase/app'
import { useEffect, useState } from 'react'

const useMyLinks = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [links, setLinks] = useState([])

  const app = getApp()
  const db = getDatabase(app)

  const handleEditLink = ({ record }) => {
    console.log('tyeste', record)
    const linkRef = ref(db, `links/${user.uid}/${record.key}`)
    update(linkRef, {
      title: 'testeUpdate',
      url: 'bosta.com.br'
    })


  }

  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Url pública',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Qtd de mídias',
      dataIndex: 'midias',
      key: 'midias',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <a title={record.name} onClick={() => { handleEditLink({record}) }}>Editar</a>
      ),
    },
  ];

  const parserLinks = list => Object
    .keys(list)
    .map(key => {
      const link = list[key]

      return {
        key: key,
        title: link.title,
        url: link.url,
        midias: Object.keys(link.files || []).length
      }
    })

  useEffect(() => {
    const linksRef = ref(db, `links/${user.uid}`)

    onValue(linksRef, (snapshot) => {
      const links = snapshot.val()

      setLinks(parserLinks(links || {}))
      setIsLoading(false)
    })
  }, [])

  return {
    isLoading,
    links,
    columns,
  }
}

export default useMyLinks
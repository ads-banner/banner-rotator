import { getDatabase, ref, child, get, set, update } from 'firebase/database'
import { getApp } from 'firebase/app'
import { useEffect, useState } from 'react'

const useMyLinks = ({ user }) => {
  const app = getApp()
  const db = getDatabase(app)
  const dbRef = ref(db)

  const [isLoading, setIsLoading] = useState(true)
  const [links, setLinks] = useState([])

  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
      // render: (text) => <a>{text}</a>,
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
        <a title={record.name}>Editar</a>
      ),
    },
  ];

  const parserLinks = list => Object
    .keys(list)
    .map(key => {
      const link = list[key]

      return {
        title: link.title,
        url: link.url,
        midias: Object.keys(link.files).length
      }
    })

  useEffect(() => {
    get(child(dbRef, `links/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const list = snapshot.val()
    
          setLinks(parserLinks(list))
        } else {
          console.log("No data available")
          // const updates = {};
          // updates['/links/' + user.uid] = {
          //   link1: {
          //     title: 'Meu primeiro link logo que eu acesso'
          //   }
          // }

          // const teste= update(dbRef, updates);
          // console.log('teste', teste)
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }, [])
  
  return {
    isLoading,
    links,
    columns,
  }
}

export default useMyLinks
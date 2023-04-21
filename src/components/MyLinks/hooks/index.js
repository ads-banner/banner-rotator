import { ref, onValue, remove } from 'firebase/database'
import { useEffect, useState } from 'react'
import { db } from 'config/firebase'

const useMyLinks = ({ user, setLink }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [links, setLinks] = useState([])

  const handleEditLink = ({ record }) => setLink(record)

  const handleDeleteLink = ({ key }) => {
    const linkRef = ref(db, `links/${user.uid}/${key}`)
    const confirm = window.confirm('DESEJA DELETAR?')

    confirm && remove(linkRef)
      .then(() => {
        console.log('removido com sucesso')
      })
      .catch(() => {
        console.log('errou ao deletar, tente novamente')
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
      render: (_, record) => (
        <>
          <a href={`/?user=${user.uid}&link=${record.key}`} target='_blank' title={record.name}>Acessar GALERIA</a>
        </>
      )
    },
    {
      title: 'Qtd de mídias',
      dataIndex: 'midiasLength',
      key: 'midiasLength'
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <>
          <a title={record.name} onClick={() => { handleEditLink({ record }) }}>Editar</a> |{' '}
          <a title={record.name} onClick={() => { handleDeleteLink({ key: record.key }) }}>Deletar</a>
        </>
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
        midias: link.midias,
        midiasLength: Object.keys(link.midias || []).length
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
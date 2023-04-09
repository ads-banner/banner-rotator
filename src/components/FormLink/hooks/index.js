import { ref, child, push, update } from 'firebase/database'
import { db } from 'config/firebase'
import { useEffect, useState } from 'react'

const useFormLink = ({
    handleToggleShowAddLink,
    link,
    user,
  }) => {
  const [initialValues, setInitialValues] = useState()
  const [uploadFiles, setUploadFiles] = useState([])

  const handleUpdateLink = (attrs) => {
    const linkRef = ref(db, `links/${user.uid}/${link.key}`)
    const { title, url } = attrs
    const midias = {}

    uploadFiles.forEach(file => {
      const key = file.key || push(child(ref(db), `links/${user.uid}/${link.key}/midias`)).key

      midias[key] = {
        url: file.url
      }
    })

    update(linkRef, {
      title,
      url,
      midias,
    }).then(() => {
      handleToggleShowAddLink()
    })
    .catch((error) => {
      console.log('nao foii, tente novamente')
    });
  }

  const handleAddLink = (attrs) => { 
    const newKey = push(child(ref(db), 'links/' + user.uid)).key
    const midias = {}
    const newLink = {}

    uploadFiles.forEach((file) => {
      const key = push(child(ref(db), `links/${user.uid}/${newKey}/midias`)).key

      midias[key] = {
        url: file.url
      }
    })

    newLink[newKey] = {
      title: attrs.title,
      url: attrs.url,
      midias
    }

    update(ref(db, 'links/' + user.uid), newLink)
      .then(() => handleToggleShowAddLink())
      .catch((error) => console.log('nao foii, tente novamente!', error))
  }

  const handleOnBeforeUpload = (file) => {
    file.url = window.URL.createObjectURL(file)
    setUploadFiles([...uploadFiles, file])

    return false
  }

  useEffect(() => {
    setInitialValues(link)
    if (link) {
      const keys = Object.keys(link.midias || [])
      const parsedMidias = keys.map((key) => ({
        key,
        url: link.midias[key].url,
      }))

      setUploadFiles(parsedMidias)
    }
  }, [link])

  return {
    handleAddLink,
    handleUpdateLink,
    handleOnBeforeUpload,
    initialValues,
    uploadFiles,
  }
}

export default useFormLink
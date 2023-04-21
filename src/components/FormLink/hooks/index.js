import { ref, child, push, update, remove } from 'firebase/database'
import { ref as refStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from 'config/firebase'
import { useEffect, useState } from 'react'

const useFormLink = ({
    handleToggleShowAddLink,
    link,
    user,
  }) => {
  const [initialValues, setInitialValues] = useState({})
  const [uploadFiles, setUploadFiles] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const linkPath = `links/${user.uid}/`

  const handleUpdateLink = (attrs) => {
    const { title, url } = attrs
    // const midias = {}
    const linkKey = link.key

    setIsSaving(true)

    console.log({attrs, link})

    sendFiles({linkKey}).then((result) => {
      const midias = result[0] && result[0].value || {}

      // result.forEach(r => {
      //   const id = Object.keys(r.value)[0]

      //   midias[id] = {
      //     path: r.value[id].path,
      //     url: r.value[id].url,
      //   }
      // })

      uploadFiles.filter(f => f.key).forEach(({ key, path, url, duration }) => {
        midias[key] = {
          path,
          url,
          duration,
        }
      })

      console.log('update', midias)

      update(ref(db, `${linkPath}${linkKey}/midias`), midias)

      update(ref(db, `${linkPath}${linkKey}`), {
        title,
        url,
      })
        .then(() => handleToggleShowAddLink())
        .catch((error) => console.log('nao foii, tente novamente', error))
        .finally(() => setIsSaving(false))
    })
  }

  const handleAddLink = (attrs) => {
    const linkKey = push(child(ref(db), linkPath)).key
    const newLink = {}

    setIsSaving(true)

    sendFiles({linkKey}).then((result) => {
      const midias = result[0].value

      newLink[linkKey] = {
        title: attrs.title,
        url: attrs.url,
        midias,
      }

      update(ref(db, linkPath), newLink)
        .then(() => handleToggleShowAddLink())
        .catch((error) => console.log('nao foii, tente novamente!', error))
        .finally(() => setIsSaving(false))
    })
  }

  const handleRemoveMidia = (midia) => {
    const mediaRef = ref(db, `${linkPath}/${link.key}/midias/${midia.key}`)
    const confirm = window.confirm('DESEJA DELETAR?')

    confirm && remove(mediaRef)
      .then(() => {
        console.log('removido com sucesso')

        const newFiles = uploadFiles.filter(file => file.key !== midia.key)
        setUploadFiles(newFiles)
      })
  }

  const handleOnBeforeUpload = (file) => {
    file.url = window.URL.createObjectURL(file)
    setUploadFiles([...uploadFiles, file])

    return false
  }

  const sendFiles = ({ linkKey }) => {
    const midias = {}
    const promises = []

    uploadFiles.filter(file => !file.key).forEach((file) => {
      const key = push(child(ref(db), `${linkPath}/${linkKey}/midias`)).key

      midias[key] = {
        url: file.url,
        path: `midias/${linkKey}/${key}/${file.name}`,
        duration: '5',
      }

      const storageRef = refStorage(storage, midias[key].path)

      promises.push(
        uploadBytes(storageRef, file)
        .then(() =>
          getDownloadURL(storageRef).then((url) => {
            midias[key].url = url

            return midias
          })
        )
      )
    })

    return Promise.allSettled(promises)
  }

  useEffect(() => {
    setInitialValues(link)

    if (link) {
      const keys = Object.keys(link.midias || [])
      const parsedMidias = keys.map((key) => ({
        key,
        url: link.midias[key].url,
        path: link.midias[key].path,
        duration: link.midias[key].duration,
      }))

      setUploadFiles(parsedMidias)
    }
  }, [link])

  return {
    handleAddLink,
    handleOnBeforeUpload,
    handleRemoveMidia,
    handleUpdateLink,
    initialValues,
    isNew: !initialValues.title,
    isSaving,
    uploadFiles,
  }
}

export default useFormLink
import { ref, child, push, update } from 'firebase/database'
import { db } from 'config/firebase'
import { useEffect, useState } from 'react'

const useFormLink = ({
    handleToggleShowAddLink,
    link,
    user,
  }) => {
  const [initialValues, setInitialValues] = useState()

  const handleUpdateLink = (attrs) => {
    const linkRef = ref(db, `links/${user.uid}/${link.key}`)

    update(linkRef, {
      title: attrs.title,
      url: attrs.url
    }).then(() => {
      handleToggleShowAddLink()
    })
    .catch((error) => {
      console.log('nao foii, tente novamente')
    });
  }

  const handleAddLink = (attrs) => { 
    const newKey = push(child(ref(db), 'links/' + user.uid)).key
    const newLink = {}

    newLink[newKey] = {
      title: attrs.title,
      url: attrs.url,
    }

    update(ref(db, 'links/' + user.uid), newLink)
    .then(() => {
      handleToggleShowAddLink()
    })
    .catch((error) => {
      console.log('nao foii, tente novamente!')
    });
  }

  useEffect(() => {
    setInitialValues(link)
  }, [link])

  return {
    handleAddLink,
    handleUpdateLink,
    initialValues,
  }
}

export default useFormLink
import { ref, child, push, update } from 'firebase/database'
import { db } from 'config/firebase'
import { useEffect, useState } from 'react'

const useFormLink = ({
    handleToggleShowAddLink,
    link,
    user,
    form,
  }) => {
  const [initialValues, setInitialValues] = useState()

  const formReset = () => {
    form.resetFields()
    //setInitialValues()
  }

  const handleUpdateLink = (attrs) => {
    console.log('handleUpdateLink', { attrs, link })
    formReset()
    handleToggleShowAddLink()
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
      formReset()
    })
    .catch((error) => {
      console.log('nao foii!')
    });
  }

  useEffect(() => {
    console.log('EFFFFFFFFFF', link)
    setInitialValues(link)
  }, [link])

  return {
    handleAddLink,
    handleUpdateLink,
    initialValues,
  }
}

export default useFormLink
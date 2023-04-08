import { ref, child, push, update } from 'firebase/database'
import { db } from 'config/firebase'

const useFormLink = ({
    handleToggleShowAddLink,
    user
  }) => {
  
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
      console.log('nao foii!')
    });
  }

  return {
    handleAddLink
  }
}

export default useFormLink
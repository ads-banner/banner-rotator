import { getDatabase, ref, child, get, set, update } from "firebase/database"
import { getApp } from 'firebase/app'
import { useEffect, useState } from "react"

const MyLinks = ({ user }) => {
  const app = getApp()
  const db = getDatabase(app)
  const dbRef = ref(db)

  const [isLoading, setIsLoading] = useState(true)
  const [links, setLinks] = useState([])

  useEffect(() => {
    get(child(dbRef, `links/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const list = snapshot.val()
    
          setLinks(
            Object.keys(list).map(key => {
              return list[key]
            })
          )
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

  if (isLoading) {
    return <p>CARREGANDO...</p>
  }

  if (!links.length) {
    return <p>NENHUM REGISTRO ENCONTRADO</p>
  }

  return <ul>
    {
      links.map((link, index) =>
        <li key={index} style={{display: 'flex', gap: '30px', padding: '10px', borderTop: '1px solid gray'}}>
            <h4>{link.title}</h4>
            <h5>{link.url}</h5>
            <h6>Midias: {Object.keys(link.files).length}</h6>
        </li>
      )
    }
  </ul>
}

export default MyLinks
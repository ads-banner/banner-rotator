import { db } from "config/firebase"
import { ref, onValue } from 'firebase/database'
import { useEffect, useRef, useState } from "react"

const useGallery = () => {
  const [midias, setMidias] = useState([])
  const [index, setIndex] = useState(0)
  const refTimeout = useRef()
  const params = new URLSearchParams(window.location.search)

  const linkId = params.get('link')
  const userId = params.get('user')

  const next = () => {
    if (midias.length) {
      refTimeout.current = setTimeout(() => {
        const nextIndex = index + 1
        const newIndex = nextIndex === midias.length ? 0 : nextIndex

        setIndex(newIndex)
      }, midias[index].duration * 1000)
    }
  }

  useEffect(() => {
    next()

    return () => clearTimeout(refTimeout.current)
  }, [index, midias])

  useEffect(() => {
    const linkRef = ref(db, `links/${userId}/${linkId}`)

    onValue(linkRef, (snapshot) => {
      const link = snapshot.val()

      const keys = Object.keys(link.midias || [])
      const parsedMidias = keys.map((key) => ({
        key,
        url: link.midias[key].url,
        duration: link.midias[key].duration,
      }))

      setMidias(parsedMidias || {})
    })
  }, [])

  return {
    currentSource: midias[index]
  }
}

export default useGallery
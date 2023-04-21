import useGallery from './hooks'

import './style.css'

const Gallery = () => {
  const { currentSource = {} } = useGallery()

  return <div className="rb-gallery">    
    <img src={currentSource.url} />
  </div>
}

export default Gallery
import React from 'react'
import Logo from './Components/Logo'
import Card from './Components/Card'
import useImageLoader from './hooks/useImageLoader'

export default function App() {
  const { images, setImages, handleFileUpload } =
    useImageLoader()

  return (
    <div className="app">
      <Card images={images} setImages={setImages} />
      <Logo
        filesCounter={images.length}
        onSelectFiles={handleFileUpload}
      />
    </div>
  )
}

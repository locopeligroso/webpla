import React, { useState } from 'react'
import Logo from './Components/Logo'
import Card from './Components/Card'

export default function App() {
  const [images, setImages] = useState([])

  return (
    <div className="flex h-screen w-full flex-col-reverse md:flex-row">
      <div className="flex h-1/2 flex-1 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#e0e0e0_25%,#ffffff_25%,#ffffff_50%,#e0e0e0_50%,#e0e0e0_75%,#ffffff_75%,#ffffff_100%)] bg-[length:20px_20px] md:h-full">
        <Card images={images} setImages={setImages} />
      </div>

      <Logo
        filesCounter={images.length}
        onSelectFiles={(files) => {
          const fileReaders = files.map((file) => {
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onload = () =>
                resolve({
                  name: file.name,
                  dataUrl: reader.result,
                })
              reader.readAsDataURL(file)
            })
          })

          Promise.all(fileReaders).then((loadedImages) => {
            setImages(loadedImages)
          })
        }}
      />
    </div>
  )
}

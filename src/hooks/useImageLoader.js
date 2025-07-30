import { useState } from 'react'

export default function useImageLoader() {
  const [images, setImages] = useState([])

  const handleFileUpload = (files) => {
    const fileReaders = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve({
            name: file.name,
            dataUrl: reader.result,
          })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(fileReaders).then(setImages)
  }

  return {
    images,
    setImages,
    handleFileUpload,
  }
}

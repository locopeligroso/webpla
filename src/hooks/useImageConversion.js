import { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default function useImageConversion(images) {
  const [format, setFormat] = useState('webp')
  const [quality, setQuality] = useState(0.8)
  const [destination, setDestination] = useState('')
  const [resizeMode, setResizeMode] = useState('original')
  const [resizeValue, setResizeValue] = useState('')

  const supportQuality =
    format === 'webp' || format === 'jpeg'

  const resetSizes = () => {
    setResizeMode('original')
    setResizeValue('')
  }

  const handleResizeModeChange = (mode) => {
    setResizeMode(mode)
    if (mode === 'original') {
      setResizeValue('')
    }
  }

  const getResizedDimensions = (originalW, originalH) => {
    const val = parseInt(resizeValue)

    if (resizeMode === 'width' && val) {
      const width = val
      const height = Math.round(
        (val * originalH) / originalW,
      )
      return [width, height]
    }

    if (resizeMode === 'height' && val) {
      const height = val
      const width = Math.round(
        (val * originalW) / originalH,
      )
      return [width, height]
    }

    return [originalW, originalH]
  }

  const downloadAll = async () => {
    const zip = new JSZip()

    const mimeTypes = {
      webp: 'image/webp',
      jpeg: 'image/jpeg',
      png: 'image/png',
    }

    const tasks = images.map(
      (file) =>
        new Promise((resolve) => {
          const img = new Image()

          img.onload = () => {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')

            const [newWidth, newHeight] =
              getResizedDimensions(img.width, img.height)

            canvas.width = newWidth
            canvas.height = newHeight
            context.drawImage(
              img,
              0,
              0,
              newWidth,
              newHeight,
            )

            const baseName =
              file.name.split('.').slice(0, -1).join('') ||
              'image'
            const fileName = `${destination ? destination + '-' : ''}${baseName}.${format}`
            const mimeType = mimeTypes[format]

            canvas.toBlob(
              (blob) => {
                zip.file(fileName, blob)
                resolve()
              },
              mimeType,
              supportQuality ? quality : undefined,
            )
          }

          img.src = file.dataUrl
        }),
    )

    await Promise.all(tasks)

    const finalZip = await zip.generateAsync({
      type: 'blob',
    })
    const zipName = destination
      ? `${destination}.zip`
      : 'immagini_convertite.zip'
    saveAs(finalZip, zipName)
  }

  // ✅ Questo è il vero return del hook
  return {
    format,
    setFormat,
    quality,
    setQuality,
    resizeMode,
    setResizeMode: handleResizeModeChange,
    resizeValue,
    setResizeValue,
    destination,
    setDestination,
    supportQuality,
    resetSizes,
    downloadAll,
  }
}

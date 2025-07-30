import { useRef } from 'react'
import Button from './Button'

export default function Logo({
  filesCounter,
  onSelectFiles,
}) {
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onSelectFiles(files)
    }
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  return (
    <div className="logo-panel">
      <img src="./logo.svg" alt="Logo" />

      <div className="upload-controls">
        <Button
          text="scegli files"
          cta
          onClick={triggerFileInput}
        />

        {/* input invisibile ma funzionante */}
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="file-counter">{filesCounter} files</p>
      </div>
    </div>
  )
}

import Button from './Button'
import { useRef } from 'react'

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
    <div className="flex h-48 w-full flex-col items-center justify-center gap-8 px-16 py-8 md:h-full md:w-1/2">
      <img
        src="./logo.svg"
        className="w-3/5 md:w-2/3"
        alt="Logo"
      />

      <div className="flex w-full flex-row items-center gap-2 md:w-2/3">
        <Button
          text="scegli files"
          cta="cta"
          onClick={triggerFileInput}
        />

        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="w-full text-lg">
          {filesCounter} files
        </p>
      </div>
    </div>
  )
}

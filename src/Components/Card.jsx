import React, { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import Button from './Button'
import InputRow from './InputRow'

export default function Card({ images, setImages }) {
  const [format, setFormat] = useState('webp')
  const [quality, setQuality] = useState(0.8)
  const [destination, setDestination] = useState('')
  const [resizeMode, setResizeMode] = useState('width')
  const [resizeValue, setResizeValue] = useState('')

  const formats = ['webp', 'jpeg', 'png']

  const resetSizes = () => setResizeValue('')

  const downloadAll = async () => {
    const zip = new JSZip()

    const tasks = images.map(
      (img) =>
        new Promise((resolve) => {
          const image = new Image()
          image.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const originalW = image.width
            const originalH = image.height

            const val = parseInt(resizeValue)
            let w = originalW
            let h = originalH

            if (resizeMode === 'width' && val) {
              w = val
              h = Math.round((val * originalH) / originalW)
            } else if (resizeMode === 'height' && val) {
              h = val
              w = Math.round((val * originalW) / originalH)
            }

            canvas.width = w
            canvas.height = h
            ctx.drawImage(image, 0, 0, w, h)

            const mime =
              format === 'jpeg'
                ? 'image/jpeg'
                : format === 'png'
                  ? 'image/png'
                  : 'image/webp'

            const supportQuality =
              format === 'webp' || format === 'jpeg'

            canvas.toBlob(
              (blob) => {
                const base =
                  img.name.replace(/\.[^.]+$/, '') ||
                  'image'
                const prefix = destination
                  ? `${destination}-`
                  : ''
                zip.file(`${prefix}${base}.${format}`, blob)
                resolve()
              },
              mime,
              supportQuality ? quality : undefined,
            )
          }

          image.src = img.dataUrl
        }),
    )

    await Promise.all(tasks)
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(
      blob,
      destination
        ? `${destination}.zip`
        : 'immagini_convertite.zip',
    )
  }

  return (
    <div className="card-container">
      {/* Format */}
      <Section label="Format">
        <div className="flex gap-4">
          {formats.map((f) => (
            <Button
              key={f}
              text={f.toUpperCase()}
              selected={f === format}
              onClick={() => setFormat(f)}
            />
          ))}
        </div>
      </Section>

      {/* Quality (only for jpeg and webp) */}
      {(format === 'webp' || format === 'jpeg') && (
        <Section label="Quality">
          <div className="flex w-full items-center gap-4">
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) =>
                setQuality(parseFloat(e.target.value))
              }
              className="h-2.5 w-full rounded-full bg-zinc-300"
            />
            <span className="text-lg text-black">
              {quality}
            </span>
          </div>
        </Section>
      )}

      <Divider />

      {/* Size */}
      <Section label="Size">
        <InputRow
          type="number"
          placeholder="2000 px"
          value={resizeValue}
          onChange={(e) => setResizeValue(e.target.value)}
        />
        <div className="flex gap-4">
          <Button
            text="WIDTH"
            selected={resizeMode === 'width'}
            onClick={() => setResizeMode('width')}
          />
          <Button
            text="HEIGHT"
            selected={resizeMode === 'height'}
            onClick={() => setResizeMode('height')}
          />
        </div>
        <Button
          text="Dimensioni originali"
          onClick={resetSizes}
        />
      </Section>

      <Divider />

      {/* Archive name */}
      <Section label="Name">
        <InputRow
          type="text"
          placeholder="Converted"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          inputClass="px-6 py-3 text-2xl"
        />
      </Section>

      {/* CTA */}
      <Button text="Scarica" cta onClick={downloadAll} />
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm font-bold uppercase text-gray-600">
        {label}
      </p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function Divider() {
  return <div className="h-[2px] w-full bg-pink-500" />
}

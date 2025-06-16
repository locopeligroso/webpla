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
          const imgEl = new Image()
          imgEl.onload = () => {
            const canvas = document.createElement('canvas')
            const originalW = imgEl.width
            const originalH = imgEl.height
            const val = parseInt(resizeValue)
            let w = originalW,
              h = originalH

            if (resizeMode === 'width' && val) {
              w = val
              h = Math.round(w * (originalH / originalW))
            } else if (resizeMode === 'height' && val) {
              h = val
              w = Math.round(h * (originalW / originalH))
            }

            canvas.width = w
            canvas.height = h
            canvas.getContext('2d').drawImage(imgEl, 0, 0, w, h)

            const mime = format === 'jpeg' ? 'image/jpeg' : `image/${format}`
            canvas.toBlob(
              (blob) => {
                const base = img.name.replace(/\.[^.]+$/, '') || 'image'
                const prefix = destination ? `${destination}-` : ''
                zip.file(`${prefix}${base}.${format}`, blob)
                resolve()
              },
              mime,
              quality,
            )
          }
          imgEl.src = img.dataUrl
        }),
    )

    await Promise.all(tasks)
    const blob = await zip.generateAsync({ type: 'blob' })
    saveAs(blob, destination ? `${destination}.zip` : 'immagini_convertite.zip')
  }

  return (
    <div className="card-container ">
      {/* Formato */}
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

      {/* Qualità */}
      <Section label="Quality">
        <div className="flex items-center gap-4 w-full">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-zinc-300 rounded-full"
          />
          <span className="text-black text-lg">{quality}</span>
        </div>
      </Section>

      <Divider />

      {/* Dimensione */}
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
        <Button text="Dimensioni originali" onClick={resetSizes} />
      </Section>

      <Divider />

      {/* Nome archivio */}
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
    <div className="flex flex-col gap-2 w-full">
      <p className="text-sm font-bold uppercase text-gray-600">{label}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function Divider() {
  return <div className="w-full h-[2px] bg-pink-500 " />
}

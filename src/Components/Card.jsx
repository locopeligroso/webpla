import useImageConversion from '../hooks/useImageConversion'
import Button from './Button'
import InputRow from './InputRow'

const FORMATS = ['webp', 'jpeg', 'png']

export default function Card({ images }) {
  const {
    format,
    setFormat,
    quality,
    setQuality,
    resizeMode,
    setResizeMode,
    resizeValue,
    setResizeValue,
    destination,
    setDestination,
    supportQuality,
    resetSizes,
    downloadAll,
  } = useImageConversion(images)

  return (
    <div className="image-preview-area">
      <div className="card-container">
        <Section label="Format">
          <div className="btn-group">
            {FORMATS.map((f) => (
              <Button
                key={f}
                text={f.toUpperCase()}
                selected={f === format}
                onClick={() => setFormat(f)}
                className="btn-small"
              />
            ))}
          </div>
        </Section>

        {supportQuality && (
          <Section label="Quality">
            <div className="quality-slider">
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) =>
                  setQuality(parseFloat(e.target.value))
                }
                className="range-slider"
                aria-label="Quality"
              />
              <span className="quality-value">
                {quality}
              </span>
            </div>
          </Section>
        )}

        <Divider />
        <Section label="Size">
          <InputRow
            type="number"
            placeholder="2000 px"
            value={resizeValue}
            onChange={(e) => setResizeValue(e.target.value)}
            disabled={resizeMode === 'original'}
          />

          <div className="btn-group">
            <Button
              text="WIDTH"
              selected={resizeMode === 'width'}
              onClick={() => setResizeMode('width')}
              className="btn-small btn-expand"
            />
            <Button
              text="HEIGHT"
              selected={resizeMode === 'height'}
              onClick={() => setResizeMode('height')}
              className="btn-small btn-expand"
            />
          </div>

          <Button
            text="DIMENSIONI ORIGINALI"
            selected={resizeMode === 'original'}
            onClick={() => setResizeMode('original')}
            className="btn-small btn-full"
            style={{ marginTop: '0.5rem' }}
          />
        </Section>

        <Divider />

        <Section label="Name">
          <InputRow
            type="text"
            placeholder="Converted"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Section>

        <Button
          text="Scarica"
          cta
          onClick={downloadAll}
          className="btn-full"
        />
      </div>
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div className="section">
      <p className="section-title">{label}</p>
      <div className="section-content">{children}</div>
    </div>
  )
}

function Divider() {
  return <div className="divider" />
}

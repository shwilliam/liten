import {PreviewIndicator} from './'
import {previewContainerStyles, roundedPreviewContainerStyles} from './styles'

export const GooglePreview = ({
  img,
  title,
  desc,
}: {
  img?: string
  title: string
  desc: string
}) => (
  <div className={roundedPreviewContainerStyles}>
    <PreviewIndicator />
    {img && (
      <div className={previewContainerStyles}>
        <img className="w-full object-cover" src={img} />
      </div>
    )}
    <div className="px-6 py-4">
      <div className="font-semibold mb-1">{title}</div>
      <p className="text-grey-darker mb-1">{desc}</p>
      <p className="opacity-50">liten.xyz</p>
    </div>
  </div>
)

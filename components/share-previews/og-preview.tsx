import {PreviewContainer, PreviewIndicator} from './'

export const OGPreview = ({
  img,
  title,
  desc,
}: {
  img?: string
  title: string
  desc: string
}) => (
  <PreviewContainer>
    <PreviewIndicator />
    {img && (
      <div className="h-40 overflow-hidden flex align-center">
        <img className="w-full object-cover" src={img} />
      </div>
    )}
    <div className="px-4 py-2">
      <p className="text-xs opacity-75 uppercase">liten.xyz</p>
      <div className="font-bold">{title}</div>
      <p className="text-grey-darker text-base">{desc}</p>
    </div>
  </PreviewContainer>
)

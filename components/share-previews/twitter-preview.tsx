import {PreviewContainer, PreviewIndicator} from './'

export const TwitterPreview = ({
  img,
  title,
  desc,
}: {
  img?: string
  title: string
  desc: string
}) => (
  <PreviewContainer rounded>
    <PreviewIndicator />
    {img && (
      <img className="w-full object-cover bg-gray-500 rounded-t-lg" src={img} />
    )}
    <div className="px-4 py-3">
      <div className="font-semibold mb-1">{title}</div>
      <p className="text-grey-darker mb-1">{desc}</p>
      <p className="opacity-50">liten.xyz</p>
    </div>
  </PreviewContainer>
)

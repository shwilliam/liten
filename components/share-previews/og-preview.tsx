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
    <div className="px-6 py-4">
      <div className="font-serif text-xl mb-2">{title}</div>
      <p className="text-grey-darker text-base">{desc}</p>
    </div>
  </PreviewContainer>
)

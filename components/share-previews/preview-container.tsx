import {ReactNode} from 'react'

type Props = {
  children?: ReactNode
  rounded?: boolean
}

export const PreviewContainer = ({rounded = false, children}: Props) => (
  <div
    className={`preview max-w-md shadow-lg my-10 md:my-16 lg:my-32 mb-16 md:mb-20 lg:mb-40 relative md:mx-auto border-black border-2 bg-white ${
      rounded ? 'rounded' : ''
    }`}
  >
    {children}
  </div>
)

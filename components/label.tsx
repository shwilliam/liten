import {ReactNode} from 'react'

type Props = {
  children?: ReactNode
  htmlFor?: string
}

const Label = ({children, htmlFor}: Props) => (
  <label
    className="text-xs absolute mx-3 -my-1 text-blue-500 lowercase"
    htmlFor={htmlFor}
  >
    {children}:
  </label>
)

export default Label

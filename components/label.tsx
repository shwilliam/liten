import {ReactNode} from 'react'

type Props = {
  children?: ReactNode
  htmlFor?: string
}

const Label = ({children, htmlFor}: Props) => (
  <label className="block font-semibold text-xl mx-2 mt-4" htmlFor={htmlFor}>
    {children}
  </label>
)

export default Label

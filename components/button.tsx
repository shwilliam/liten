import {ButtonHTMLAttributes, ReactNode} from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  invert?: boolean
  children?: ReactNode
}

const Button = ({
  className = '',
  invert = false,
  children,
  ...props
}: Props) => (
  <button
    className={`block px-3 py-2 font-bold border-4 border-blue-500 ${
      invert
        ? 'text-blue-500 hover:bg-blue-500 hover:text-white'
        : 'text-white bg-blue-500 hover:bg-white hover:text-blue-500'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default Button

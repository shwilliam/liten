import {ReactNode, ButtonHTMLAttributes} from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode
}

const Button = ({className = '', children, ...props}: Props) => (
  <button
    className={`block px-3 py-2 bg-blue-500 font-bold text-white border-4 border-blue-500 hover:bg-white hover:text-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
)

export default Button

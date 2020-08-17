import {ReactNode} from 'react'

type Props = {
  className?: string
  href: string
  invert?: boolean
  children?: ReactNode
}

const LinkButton = ({
  className = '',
  href,
  invert = false,
  children,
  ...props
}: Props) => (
  <a
    className={`inline-block px-3 py-2 font-bold text-white border-4 border-blue-500 ${
      invert
        ? 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'
        : 'bg-blue-500 hover:bg-white hover:text-blue-500'
    } ${className}`}
    href={href}
    {...props}
  >
    {children}
  </a>
)

export default LinkButton
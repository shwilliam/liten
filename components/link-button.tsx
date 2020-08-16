import {ReactNode} from 'react'

type Props = {
  className?: string
  href: string
  children?: ReactNode
}

const LinkButton = ({className = '', href, children, ...props}: Props) => (
  <a
    className={`inline-block px-3 py-2 bg-blue-500 font-bold font-mono text-white border-4 border-blue-500 hover:bg-white hover:text-blue-500 ${className}`}
    href={href}
    {...props}
  >
    {children}
  </a>
)

export default LinkButton

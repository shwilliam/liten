import Link from 'next/link'
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
  <Link href={href}>
    <a
      className={`inline-block px-3 py-2 font-bold text-white border-4 border-blue-500 ${
        invert
          ? 'bg-white text-blue-500 hover:opacity-50'
          : 'bg-blue-500 hover:bg-white hover:text-blue-500'
      } ${className}`}
      {...props}
    >
      {children}
    </a>
  </Link>
)

export default LinkButton

import {ReactNode} from 'react'

const InputWrapper = ({
  className = '',
  first = false,
  children,
}: {
  className?: string
  first?: boolean
  children?: ReactNode
}) => (
  <div
    className={`w-full flex-grow border-4 border-blue-500 pt-2 -mt-1 ${
      first ? 'sm:border-r-0' : ''
    } ${className}`}
  >
    {children}
  </div>
)

export default InputWrapper

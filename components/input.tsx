import {InputHTMLAttributes} from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean
  disabledTitle?: string
}

const Input = ({disabled = false, disabledTitle, ...props}: Props) => (
  <input
    className="w-full px-3 mt-3 py-1 sm:mr-2 placeholder-gray-800 bg-transparent"
    disabled={disabled}
    title={disabled ? disabledTitle : undefined}
    {...props}
  />
)

export default Input

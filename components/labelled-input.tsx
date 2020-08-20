import {InputHTMLAttributes, ReactNode} from 'react'

import Input from './input'
import InputWrapper from './input-wrapper'
import Label from './label'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  disabled?: boolean
  disabledTitle?: string
  first?: boolean
  children: ReactNode
}

const LabelledInput = ({
  id,
  disabled = false,
  disabledTitle,
  first = false,
  children,
  ...props
}: Props) => (
  <InputWrapper className={disabled ? 'disabled' : ''} first={first}>
    <Label htmlFor={id}>{children}</Label>
    <Input
      id={id}
      disabled={disabled}
      disabledTitle={disabledTitle}
      {...props}
    />
  </InputWrapper>
)

export default LabelledInput

import {CSSProperties, ReactNode, useRef} from 'react'
import {useMouseHovered} from 'react-use'

interface Props {
  text: string
  error?: boolean
  children?: ReactNode
}

export const MouseTooltip = ({text = '', error = false, children}: Props) => {
  const containerRef = useRef(null)
  const {docX, docY} = useMouseHovered(containerRef, {whenHovered: true})

  const TEXT_OFFSET_Y = -30
  const tooltipStyle = {
    position: 'absolute',
    top: `${docY + TEXT_OFFSET_Y}px`,
    left: `${docX}px`,
    zIndex: 999,
  } as CSSProperties

  return (
    <div ref={containerRef}>
      {children}
      <p className={error ? 'text-red-500' : ''} style={tooltipStyle}>
        {text}
      </p>
    </div>
  )
}

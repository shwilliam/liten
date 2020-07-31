import {ReactNode} from 'react'

type Props = {
  label?: string
  labelShort?: string
  figure: number | string
  children: ReactNode
}

const SummaryCard = ({
  label = '',
  labelShort = '',
  figure = 0,
  children,
}: Props) => (
  <div className="mr-1 text-center inline-block sm:block">
    <div className="flex items-center justify-center p-2">
      {children}
      <span className="p-1 md:p-2 lg:p-4 text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">
        {figure}
      </span>
    </div>
    <p className="uppercase leading-tight whitespace-nowrap overflow-visible text-gray-600">
      <span className="hidden md:inline-block text-xl -mt-1">{label}</span>
      <span className="md:hidden text-sm sm:text-base">{labelShort}</span>
    </p>
  </div>
)

export default SummaryCard

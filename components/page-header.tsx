import {ReactNode} from 'react'

type Props = {
  title: ReactNode | string
  subtitle?: ReactNode | string
}

const PageHeader = ({title, subtitle}: Props) => (
  <section className="container px-4 sm:px-8 lg:my-8 xl:px-20 mx-auto">
    <p className="md:text-center mt-3 md:mt-8 text-gray-500 leading-tight">
      {subtitle}
    </p>
    <h1 className="font-bold text-4xl md:text-6xl md:text-center mb-3 md:mb-8 text-gray-900 leading-tight">
      {title}
    </h1>
  </section>
)

export default PageHeader

import {ReactNode} from 'react'

const PageWrapper = ({children}: {children: ReactNode}) => (
  <div className="container px-4 sm:px-8 lg:my-8 xl:px-20 mx-auto">
    {children}
  </div>
)

export default PageWrapper

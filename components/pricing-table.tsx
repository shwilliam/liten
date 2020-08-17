import Link from 'next/link'

const PricingTable = () => (
  <div className="antialiased max-w-6xl mx-auto mt-0 mb-12 px-8 md:px-0 lg:px-6">
    <div className="relative block px-2 sm:px-12 md:flex items-center">
      <div className="w-full md:w-1/2 relative z-30 bg-gray-100 overflow-hidden border-4 border-blue-500 md:border-r-0">
        <div className="font-mono text-2xl font-medium text-blue-500 p-8 text-center border-b-4 border-blue-500 tracking-wide">
          Free account
        </div>
        <div className="flex justify-center mt-12 mb-8">
          <ul>
            <li className="flex items-center">
              <div className="p-1 fill-current"></div>
              <span className="text-lg ml-3">Unlimited short URLs</span>
            </li>
            <li className="flex items-center mt-3">
              <div className="p-1 fill-current"></div>
              <span className="text-lg ml-3">Custom link previews</span>
            </li>
            <li className="flex items-center mt-3">
              <div className="p-1 fill-current"></div>
              <span className="text-lg ml-3">Dissect clicks per hour</span>
            </li>
          </ul>
        </div>
        <Link href="/login">
          <a className="block flex items-center justify-center mt-16 px-3 py-4 bg-blue-500 font-bold text-white border-t-4 border-blue-500 hover:bg-white hover:text-blue-500">
            <span>Get started</span>
            <span className="font-medium ml-2">➔</span>
          </a>
        </Link>
      </div>
      <div className="w-full md:w-1/2 relative px-8 md:px-0 md:py-12 -mt-2 md:-mt-10">
        <div className="overflow-hidden border-4 border-blue-500">
          <div className="font-mono text-2xl font-medium p-8 text-center border-b-4 text-blue-500 border-blue-500 tracking-wide">
            Subscription
          </div>
          <div className="block sm:flex md:block lg:flex items-center justify-center">
            <div className="mt-8 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center font-serif">
              <div className="inline-flex items-center text-blue-500 font-mono">
                <span className="text-3xl">4</span>
                <span className="ml-2">CAD</span>
              </div>
              <span className="block text-md italic -mt-2 mb-4">per month</span>
            </div>
          </div>
          <div className="text-center leading-8 md:text-xl max-w-sm mx-auto px-8 lg:px-0 pt-4 pb-6">
            Fully customize your short URLs with unique images for each of your
            favorite social platforms (Twitter, Facebook,&nbsp;etc.)
          </div>
          <Link href="/login">
            <a className="block flex items-center justify-center mt-16 px-3 py-4 bg-blue-500 font-bold text-white border-t-4 border-blue-500 hover:bg-white hover:text-blue-500">
              <span>Sign up</span>
              <span className="font-medium ml-2">➔</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default PricingTable

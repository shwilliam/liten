import Link from 'next/link'

const PricingTable = () => (
  <div className="antialiased max-w-6xl mx-auto mt-0 mb-12 px-8 md:px-0 lg:px-6">
    <div className="relative block px-2 sm:px-12 md:flex items-center">
      <div className="w-full md:w-1/2 relative z-30 bg-gray-100 rounded shadow-lg overflow-hidden border">
        <div className="text-2xl font-medium text-indigo-500 p-8 text-center border-b border-gray-200 tracking-wide">
          Free account
        </div>
        <div className="flex justify-center mt-12 mb-8">
          <ul>
            <li className="flex items-center">
              <div className="bg-indigo-500 rounded-full p-1 fill-current"></div>
              <span className="text-gray-700 text-lg ml-3">
                Unlimited short URLs
              </span>
            </li>
            <li className="flex items-center mt-3">
              <div className="bg-indigo-500 rounded-full p-1 fill-current"></div>
              <span className="text-gray-700 text-lg ml-3">
                Custom link previews
              </span>
            </li>
            <li className="flex items-center mt-3">
              <div className="bg-indigo-500 rounded-full p-1 fill-current"></div>
              <span className="text-gray-700 text-lg ml-3">
                Dissect clicks per hour
              </span>
            </li>
          </ul>
        </div>
        <Link href="/login">
          <a className="block flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-8 text-md font-semibold text-gray-500 uppercase mt-16">
            <span>Get started</span>
            <span className="font-medium text-gray-700 ml-2">➔</span>
          </a>
        </Link>
      </div>
      <div className="w-full md:w-1/2 relative px-8 md:px-0 md:py-12 -my-2 md:-my-0">
        <div className="bg-indigo-600 text-white shadow-lg overflow-hidden rounded">
          <div className="text-2xl font-medium p-8 text-center border-b border-indigo-500 tracking-wide">
            Subscription
          </div>
          <div className="block sm:flex md:block lg:flex items-center justify-center">
            <div className="mt-8 sm:m-8 md:m-0 md:mt-8 lg:m-8 text-center">
              <div className="inline-flex items-center">
                <span className="text-3xl font-medium">4</span>
                <span className="text-xl ml-2">CAD</span>
              </div>
              <span className="block text-sm text-gray-200">per month</span>
            </div>
          </div>
          <div className="text-center md:text-xl max-w-sm mx-auto text-white px-8 lg:px-0 pt-4 pb-6">
            Fully customize your short URLs with unique images for each of your
            favorite social platforms (Twitter, Facebook,&nbsp;etc.)
          </div>
          <Link href="/login">
            <a className="block flex items-center justify-center bg-indigo-700 hover:bg-indigo-500 p-8 text-md font-semibold text-white uppercase mt-16">
              <span>Sign up</span>
              <span className="font-medium text-gray-300 ml-2">➔</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </div>
)

export default PricingTable

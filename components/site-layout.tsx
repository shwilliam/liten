import {ReactNode, useState} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {useRouter} from 'next/dist/client/router'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({children, title = 'liten'}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(s => !s)
  const router = useRouter()

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <header className="sticky top-0 bg-gray-100 z-50">
        <nav className="flex items-center justify-between flex-wrap p-6 container px-4 sm:px-8 xl:px-20 mx-auto">
          <div className="flex items-center flex-no-shrink mr-6">
            <Link href="/">
              <a className="font-semibold text-xl tracking-tight hover:opacity-75">
                liten
              </a>
            </Link>
          </div>

          <div className="block sm:hidden">
            <button
              onClick={toggleOpen}
              className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <ul
            className={`w-full ${
              isOpen ? 'block' : 'hidden'
            } flex-grow sm:flex sm:items-center sm:w-auto justify-end`}
          >
            <li className="block mt-4 sm:inline-block sm:mt-0 mr-8">
              <Link href="/about">
                <a
                  className={`active border-orange-600 hover:opacity-75 ${
                    router.route === '/about' && 'border-b-2'
                  }`}
                >
                  about
                </a>
              </Link>
            </li>
            <li className="block mt-4 sm:inline-block sm:mt-0 mr-8">
              <a href="/api/links" className="hover:opacity-75">
                all
              </a>
            </li>
            <li className="block mt-4 sm:inline-block sm:mt-0 mr-4">
              <Link href="/">
                <a className="block px-3 py-2 border rounded hover:bg-orange-600 hover:text-white border-orange-600 bg-white text-orange-600">
                  Sign up
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="mt-10">
        <hr />
        <div className="container px-4 sm:px-8 xl:px-20 mx-auto">liten</div>
      </footer>
    </div>
  )
}

export default Layout

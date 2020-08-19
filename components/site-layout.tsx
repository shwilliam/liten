import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode, useState} from 'react'

import Logo from './logo'

type Props = {
  children?: ReactNode
  title?: string
  isAuthenticated?: boolean
}

const Layout = ({
  children,
  title = 'liten',
  isAuthenticated = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(s => !s)
  const router = useRouter()

  return (
    <div className="layout bg min-h-screen flex flex-col font-sans">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Recursive:wght,CASL,MONO@770,0.25,0.25&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header
        className={`text-blue-500 sticky top-0 z-50 ${
          isOpen ? 'bg' : 'bg-fade'
        }`}
      >
        <nav className="flex items-center justify-between flex-wrap pt-6 pb-4 container px-4 sm:px-8 xl:px-20 mx-auto">
          <Link href="/">
            <a>
              <span className="sr-only">Home</span>
              <Logo />
            </a>
          </Link>

          <div className="flex items-center flex-no-shrink sm:ml-4 md:ml-6">
            <Link href="/">
              <a className="font-mono font-semibold text-xl tracking-tight mx-auto hover:opacity-75">
                liten
              </a>
            </Link>
          </div>

          <div className="block sm:hidden z-20">
            <button
              onClick={toggleOpen}
              className="flex items-center px-3 py-2 hover:opacity-50"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                role="img"
                aria-label="Menu"
                stroke="currentColor"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          <ul
            className={`w-full ${
              isOpen ? 'block' : 'hidden'
            } flex-grow sm:flex sm:items-center sm:w-auto justify-end`}
          >
            {isAuthenticated && (
              <>
                <li className="block mt-4 sm:inline-block sm:mt-0 mr-8">
                  <Link href="/dashboard">
                    <a
                      className={`active border-indigo-600 hover:opacity-75 ${
                        router.route === '/dashboard' && 'border-b-2'
                      }`}
                    >
                      dashboard
                    </a>
                  </Link>
                </li>
                <li className="block mt-4 sm:inline-block sm:mt-0 mr-8">
                  <Link href="/profile">
                    <a
                      className={`active border-indigo-600 hover:opacity-75 ${
                        router.route === '/profile' && 'border-b-2'
                      }`}
                    >
                      profile
                    </a>
                  </Link>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <li className="block mt-4 sm:inline-block sm:mt-0 mr-4">
                <Link href="/login">
                  <a className="block px-3 py-2 border-4 border-blue-500 bg-blue-500 text-white hover:bg-white hover:text-blue-500 font-bold">
                    Get started
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <section>
        <hr />
        <footer className="flex items-center justify-between flex-wrap p-6 container px-4 sm:px-8 xl:px-20 mt-4 mb-1 mx-auto">
          <p>liten.xyz</p>

          <ul className="flex justify-end lowercase">
            <li className="block sm:inline-block sm:mt-0 px-2">
              <a
                href="https://github.com/shwilliam/liten/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="active border-indigo-600 hover:opacity-75"
              >
                Support
              </a>
            </li>
            |
            <li className="block sm:inline-block sm:mt-0 px-2">
              <Link href="/privacy-policy">
                <a className="active border-indigo-600 hover:opacity-75">
                  Privacy Policy
                </a>
              </Link>
            </li>
            |
            <li className="block sm:inline-block sm:mt-0 px-2">
              <Link href="/terms-of-service">
                <a className="active border-indigo-600 hover:opacity-75">
                  Terms of Service
                </a>
              </Link>
            </li>
          </ul>
        </footer>
      </section>
    </div>
  )
}

export default Layout

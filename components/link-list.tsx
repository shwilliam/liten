import Alert from '@reach/alert'
import {useState} from 'react'
import {useCopyToClipboard} from 'react-use'

import {removeURLScheme, removeWebHostString} from '../lib'

type ItemProps = {
  slug: string
  target: string
  onCopy: (message: string) => void
  stats: string
}

const LinkListItem = ({slug, target, onCopy, stats = false}: ItemProps) => {
  const shortLink = `https://liten.xyz/${slug}`
  const handleCopy = () => onCopy(shortLink)

  return (
    <li
      key={slug}
      className="sm:flex sm:justify-between flex-grow px-3 py-2 my-2 border rounded bg-white relative"
    >
      <Alert className="inline-block flex-grow m-1 sm:m-0 flex whitespace-no-wrap">
        <a className="text-gray-900" href={shortLink}>
          liten.xyz/{slug}
        </a>
        <span
          role="img"
          aria-label="Arror right"
          className="px-1 sm:px-4 lg:px-5 text-gray-500"
        >
          →
        </span>
        <a
          className="text-gray-500 hover:text-gray-900 relative w-full overflow-hidden"
          href={target}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="overflow-fade" />
          <span className="absolute left-0">
            {removeWebHostString(removeURLScheme(target))}
          </span>
        </a>
      </Alert>

      <div className="flex sm:flex-row-reverse">
        <a
          className="text-center bg-indigo-500 text-white hover:opacity-50 w-full sm:w-auto rounded py-1 sm:py-0 mt-1 sm:mt-0 sm:px-4 md:px-6 mr-6 sm:mr-0"
          href={`/${slug}/edit`}
        >
          Edit
        </a>
        {stats && (
          <a
            className={`text-center text-indigo-500 hover:opacity-50 w-full sm:w-auto rounded py-1 sm:py-0 mt-1 sm:mt-0 sm:px-4 md:px-6 sm:mr-4 ${
              stats ? 'border' : ''
            }`}
            href={`/${slug}/stats`}
          >
            Views
          </a>
        )}
        <button
          className={`text-indigo-500 hover:opacity-50 sm:w-auto rounded py-1 sm:py-0 mt-1 sm:mt-0 ${
            stats
              ? 'absolute top-0 right-0 sm:static z-50 p-2 mt-2 sm:mt-0 px-4'
              : 'sm:px-4 md:px-6 w-full'
          }`}
          onClick={handleCopy}
        >
          {stats ? (
            <>
              <span className="sr-only">Copy</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </>
          ) : (
            'Copy'
          )}
        </button>
      </div>
    </li>
  )
}

type LinkSummary = {
  slug: string
  target: string
}

type Props = {
  links: LinkSummary[]
  stats: boolean
}

const LinkList = ({links = [], stats = false}: Props) => {
  const [, copyToClipboard] = useCopyToClipboard()
  const [copiedAlerts, setCopiedAlerts] = useState<string[]>([])
  const handleCopyToClipboard = (message: string) => {
    copyToClipboard(message)
    setCopiedAlerts(alerts => alerts.concat([message]))
    setTimeout(() => {
      setCopiedAlerts(alerts => alerts.slice(1))
    }, 5000)
  }

  return links?.length ? (
    <>
      <ul>
        {links.map(({slug, target}) => (
          <LinkListItem
            key={slug}
            slug={slug}
            target={target}
            onCopy={handleCopyToClipboard}
            stats={stats}
          />
        ))}
      </ul>

      <div className="fixed bottom-0 right-0 left-0 md:left-auto z-50 text-center md:text-left md:py-4 md:px-4 -mb-1">
        {copiedAlerts.map((message, idx) => (
          <Alert key={idx}>
            <div className="px-2 py-4 md:py-2 md:my-1 bg-indigo-800 items-center text-indigo-100 leading-none md:rounded-full flex md:inline-flex border-b-2 border-white md:border-0">
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Copied
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                {message}
              </span>
            </div>
          </Alert>
        ))}
      </div>
    </>
  ) : null
}

export default LinkList

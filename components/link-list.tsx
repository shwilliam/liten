import Alert from '@reach/alert'
import Link from 'next/link'
import {useState} from 'react'
import {useCopyToClipboard} from 'react-use'

import {removeURLScheme, removeWebHostString} from '../lib'
import IconCopy from './icon-copy'
import IconViews from './icon-views'
import LinkButton from './link-button'
import ToastsList from './toasts-list'

type ItemProps = {
  idx: number
  slug: string
  target: string
  onCopy: (message: string) => void
  stats?: boolean
}

const LinkListItem = ({
  idx,
  slug,
  target,
  onCopy,
  stats = false,
}: ItemProps) => {
  const shortLink = `https://liten.xyz/${slug}`
  const handleCopy = () => onCopy(shortLink)

  return (
    <li
      key={slug}
      className={`sm:flex sm:justify-between flex-grow border-4 border-blue-500 bg-white relative ${
        idx === 0 ? '' : 'border-t-0'
      }`}
    >
      <Alert className="inline-block flex-grow p-3 flex whitespace-no-wrap">
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

      <div className="flex sm:flex-row-reverse border-t-4 sm:border-t-0 border-blue-500">
        <LinkButton
          className="text-white w-full border-t-0 border-l-0 border-b-0 sm:border-t-0 sm:border-l-4 sm:w-auto sm:border-r-0"
          href={`/${slug}/edit`}
        >
          Edit
        </LinkButton>
        {stats && (
          <>
            <LinkButton
              className={`sm:hidden text-center w-full sm:w-auto sm:border-l-4 ${
                stats ? 'border' : ''
              }`}
              href={`/${slug}/stats`}
              invert
            >
              Views
            </LinkButton>
            <a
              className="hidden sm:inline-block text-blue-500 hover:opacity-50 sm:w-auto absolute top-0 right-0 sm:static z-10 p-3 sm:mt-0 px-2 mr-2"
              href={`/${slug}/stats`}
            >
              <span className="sr-only">Views</span>
              <IconViews hidden />
            </a>
          </>
        )}
        <button
          className={`text-blue-500 hover:opacity-50 sm:w-auto ${
            stats
              ? 'absolute top-0 right-0 sm:static z-10 p-3 sm:mt-0 px-2'
              : 'sm:px-4 md:px-6 w-full'
          }`}
          onClick={handleCopy}
        >
          {stats ? (
            <>
              <span className="sr-only">Copy</span>
              <IconCopy hidden />
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
  stats?: boolean
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
        {links.map(({slug, target}, idx) => (
          <LinkListItem
            idx={idx}
            key={slug}
            slug={slug}
            target={target}
            onCopy={handleCopyToClipboard}
            stats={stats}
          />
        ))}
      </ul>

      <ToastsList keyword="Copied" data={copiedAlerts} />
    </>
  ) : (
    <p>
      Nothing here yet.{' '}
      <Link href="/#try">
        <a className="border-gray-900 border-b-2 hover:opacity-50">
          Create one?
        </a>
      </Link>
    </p>
  )
}

export default LinkList

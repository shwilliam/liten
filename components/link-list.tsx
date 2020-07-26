import Alert from '@reach/alert'
import {useCopyToClipboard} from 'react-use'

import {removeURLScheme, removeWebHostString} from '../utils'

type ItemProps = {
  slug: string
  target: string
}

const LinkListItem = ({slug, target}: ItemProps) => {
  const [, copyToClipboard] = useCopyToClipboard()
  const shortLink = `https://liten.xyz/${slug}`
  const handleCopyToClipboard = () => copyToClipboard(shortLink)

  return (
    <li
      key={slug}
      className="sm:flex sm:justify-between flex-grow px-3 py-2 my-2 border rounded bg-white"
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
          className="text-center bg-blue-700 text-white hover:opacity-50 w-full sm:w-auto rounded py-1 sm:py-0 mt-1 sm:mt-0 sm:px-4 md:px-6"
          href={`/${slug}/edit`}
        >
          Edit
        </a>
        <button
          className="text-blue-700 hover:opacity-50 w-full sm:w-auto rounded py-1 sm:py-0 mt-1 sm:mt-0 sm:px-4 md:px-6"
          onClick={handleCopyToClipboard}
        >
          Copy
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
}

const LinkList = ({links = []}: Props) =>
  links?.length ? (
    <>
      <h2 className="font-semibold text-4xl lg:text-5xl tracking-tight text-white mt-6 lg:mt-10 xl:mt-12 mb-2">
        Your Links
      </h2>
      <ul>
        {links.map(({slug, target}) => (
          <LinkListItem key={slug} slug={slug} target={target} />
        ))}
      </ul>
    </>
  ) : null

export default LinkList

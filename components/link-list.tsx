import Alert from '@reach/alert'
import {useCopyToClipboard} from 'react-use'

const LinkListItem = ({slug, target}) => {
  const [_, copyToClipboard] = useCopyToClipboard()
  const shortLink = `https://liten.xyz/${slug}`
  const handleCopyToClipboard = () => copyToClipboard(shortLink)

  return (
    <li
      key={slug}
      className="sm:flex sm:justify-between flex-grow px-3 py-2 my-2 border rounded bg-white"
    >
      <Alert>
        <div className="inline-block flex-grow m-1 sm:m-0">
          <a className="text-gray-900" href={shortLink}>
            liten.xyz/{slug}
          </a>
          <span
            role="img"
            aria-label="Arror right"
            className="px-4 text-gray-500"
          >
            →
          </span>
          <a
            className="text-gray-500 hover:text-gray-900"
            href={target}
            target="_blank"
            rel="noopener noreferrer"
          >
            {target}
          </a>
        </div>

        <button
          className="bg-blue-700 text-white sm:bg-white sm:text-blue-700 hover:opacity-50 w-full sm:w-auto rounded py-1 sm:py-0 mt-1 sm:mt-0"
          onClick={handleCopyToClipboard}
        >
          Copy
        </button>
      </Alert>
    </li>
  )
}

const LinkList = ({links = []}) =>
  links?.length ? (
    <>
      <h2 className="font-semibold text-3xl tracking-tight text-white mt-6 mb-2">
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

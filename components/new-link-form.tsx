import {useState} from 'react'
import {useMutation} from 'react-query'

import LinkList from './link-list'

const createLinkRequest = async (data: any) => {
  const response = await fetch('/api/links/_create', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseJSON = await response.json()

  return responseJSON.link
}

const useCreateLink = () => useMutation(createLinkRequest)

const NewLinkForm = () => {
  const [createdLinks, setCreatedLinks] = useState([])
  const [slug, setSlug] = useState('')
  const [target, setTarget] = useState('')
  const handleSlugChange = (e: any) => setSlug(e.target.value)
  const handleTargetChange = (e: any) => setTarget(e.target.value)
  const [createLink, {isLoading, isError}] = useCreateLink()

  const handleLinkSubmit = async (event: any) => {
    event.preventDefault()
    const slugValue = slug.trim()
    const targetValue = target.trim()

    if (!slugValue || !targetValue) {
      // TODO
      return
    }

    const link = await createLink({slug: slugValue, target: targetValue})
    setSlug('')
    setTarget('')
    setCreatedLinks((s: any) => [link, ...s])
  }

  return (
    <>
      <h2 className="font-semibold text-3xl tracking-tight text-white my-2">
        Try it out!
      </h2>
      <form
        className="flex justify-between flex-wrap lg:flex-no-wrap"
        onSubmit={handleLinkSubmit}
      >
        <div className="sm:flex w-full">
          <label className="sr-only" htmlFor="slug">
            Slug
          </label>
          <input
            value={slug}
            onChange={handleSlugChange}
            className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
            name="slug"
            id="slug"
            type="text"
            placeholder="/awesome"
            autoFocus
            required
          />

          <label className="sr-only" htmlFor="target">
            Target
          </label>
          <input
            value={target}
            onChange={handleTargetChange}
            className="w-full flex-grow px-3 py-2 my-1 border rounded lg:mr-2 placeholder-gray-800"
            name="target"
            id="target"
            type="url"
            placeholder="https://awesome-site.com"
            required
          />
        </div>

        <button
          disabled={isLoading}
          className="block w-full lg:w-auto flex-shrink-0 px-3 py-2 my-1 border rounded bg-orange-700 text-white border-orange-700 hover:opacity-75"
          type="submit"
        >
          Generate
        </button>
      </form>

      <LinkList links={createdLinks} />
    </>
  )
}

export default NewLinkForm

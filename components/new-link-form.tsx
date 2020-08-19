import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {useMutation} from 'react-query'
import {useLocalStorage} from 'react-use'

import {Link} from '../interfaces'
import Button from './button'
import LinkList from './link-list'

const createLinkRequest = async (data: any) => {
  const response = await fetch('/api/links/create', {
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
  const [localCreatedLinks, setLocalCreatedLinks] = useLocalStorage(
    'created_links',
  )
  const [createdLinks, setCreatedLinks] = useState<Link[] | []>(
    localCreatedLinks ? JSON.parse(localCreatedLinks as string) : [],
  )
  const [slug, setSlug] = useState('')
  const [target, setTarget] = useState('')
  const [error, setError] = useState()
  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSlug(e.target.value)
  const handleTargetChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTarget(e.target.value)
  const [createLink, {isLoading}] = useCreateLink()

  const handleLinkSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const slugValue = slug.trim()
    const targetValue = target.trim()

    if (!slugValue || !targetValue) {
      // TODO
      return
    }

    const link = await createLink({slug: slugValue, target: targetValue})

    if (link) {
      setSlug('')
      setTarget('')
      setCreatedLinks(s => [link, ...s])
    } else {
      setError('Slug already in use.')
    }
  }

  useEffect(() => {
    setLocalCreatedLinks(JSON.stringify(createdLinks))
  })

  return (
    <section>
      <div className="my-16 md:my-32 md:mb-20">
        <h2
          id="try"
          className="font-serif italic text-blue-500 text-center text-3xl lg:text-4xl tracking-tight my-8"
        >
          Create a short link
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
              className="w-full flex-grow px-3 py-2 border-4 border-b-0 sm:border-b-4 sm:border-r-0 border-blue-500 placeholder-gray-800"
              name="slug"
              id="slug"
              type="text"
              placeholder="/awesome"
              required
            />

            <label className="sr-only" htmlFor="target">
              Target
            </label>
            <input
              value={target}
              onChange={handleTargetChange}
              className="w-full flex-grow px-3 py-2 border-4 border-blue-500 placeholder-gray-800"
              name="target"
              id="target"
              type="url"
              placeholder="https://awesome-site.com"
              required
            />
          </div>

          <Button
            disabled={isLoading}
            className="sm:w-auto sm:ml-auto w-full lg:w-auto flex-shrink-0 border-t-0 lg:border-t-4 lg:border-l-0"
            type="submit"
          >
            Generate
          </Button>
        </form>
        {error && <p className="text-white my-2">{error}</p>}
      </div>

      {createdLinks?.length > 0 && (
        <div className="my-32 md:mb-20">
          <h2 className="font-serif italic text-blue-500 text-center text-3xl lg:text-4xl tracking-tight my-8">
            Your links
          </h2>
          <LinkList links={createdLinks} />
        </div>
      )}
    </section>
  )
}

export default NewLinkForm

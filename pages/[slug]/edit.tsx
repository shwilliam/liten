import {GetServerSideProps} from 'next'
import {FormEvent, SyntheticEvent, useReducer} from 'react'
import {useMutation} from 'react-query'

import Layout from '../../components/site-layout'
import {Link, LinkMeta} from '../../interfaces'

type Props = {
  link: Link
  slug: string
}

const updateLinkRequest = async (data: any) => {
  const response = await fetch('/api/links/_edit', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseJSON = await response.json()

  return responseJSON.link
}

const useUpdateLink = () => useMutation(updateLinkRequest)

type LinkEditFormAction = {
  type: string
  payload: any
}

const linkEditFormReducer = (form: LinkMeta, action: LinkEditFormAction) => {
  switch (action.type) {
    case 'INPUT':
      return {...form, [action.payload.name]: action.payload.value}
    default:
      return form
  }
}

const defaultLinkData = {
  title: '', // <50 chars
  desc: '', // <160 chars
  og_title: '',
  og_desc: '',
  og_img_src: '',
  og_site: '',
  twitter_title: '',
  twitter_desc: '', // <200 chars
  twitter_img_alt: '',
  twitter_img_src: '', // >280x150
  twitter_site_acc: '',
  twitter_author_acc: '',
  google_title: '',
  google_desc: '',
  google_img_src: '',
}

const LinkEditPage = ({link, slug}: Props) => {
  const [updateLink, {isLoading}] = useUpdateLink()
  const [form, dispatch] = useReducer(linkEditFormReducer, {
    ...defaultLinkData,
    ...link,
  })

  const handleInput = (e: SyntheticEvent) =>
    dispatch({type: 'INPUT', payload: e.target})

  const handleFileInput = async (e: any) => {
    const file = e.target.files[0]

    if (!file) return
    e.persist()

    // 1mb
    if (file.size > 1048576) {
      alert('Image exceeds max file size of 1mb')
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    })
    const {image} = await response.json()

    dispatch({
      type: 'INPUT',
      payload: {
        name: e.target.name,
        value: image.secure_url,
      },
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await updateLink({...form, slug})
    alert('✨')
  }

  return (
    <Layout title={`edit ${slug} ~ liten`}>
      <div className="py-8 pb-10 sm:py-10 sm:pb-12">
        <div className="container px-4 sm:px-8 lg:my-8 xl:px-20 mx-auto">
          <h1 className="font-bold text-4xl md:text-6xl max-w-xl text-gray-900 leading-tight">
            Edit /{slug}
          </h1>

          <form
            className="flex justify-between flex-wrap"
            onSubmit={handleSubmit}
          >
            <p className="font-semibold text-xl tracking-tight mt-6">General</p>
            <div className="sm:flex w-full">
              <label className="sr-only" htmlFor="title">
                Title
              </label>
              <input
                value={form.title}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="title"
                id="title"
                type="text"
                placeholder="Title"
                maxLength={50}
              />

              <label className="sr-only" htmlFor="desc">
                Description
              </label>
              <input
                value={form.desc}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="desc"
                id="desc"
                type="text"
                placeholder="Description"
                maxLength={160}
              />
            </div>

            <p className="font-semibold text-xl tracking-tight mt-6">
              Facebook
            </p>
            <div className="sm:flex w-full">
              <label className="sr-only" htmlFor="og_title">
                Facebook title
              </label>
              <input
                value={form.og_title}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="og_title"
                id="og_title"
                type="text"
                placeholder="Title"
                maxLength={50}
              />

              <label className="sr-only" htmlFor="og_desc">
                Facebook description
              </label>
              <input
                value={form.og_desc}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="og_desc"
                id="og_desc"
                type="text"
                placeholder="Description"
                maxLength={160}
              />
            </div>

            <div className="sm:flex w-full">
              <label className="sr-only" htmlFor="og_img_src">
                Facebook image
              </label>
              <input
                onChange={handleFileInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="og_img_src"
                id="og_img_src"
                type="file"
                accept="image/png, image/jpeg"
                multiple={false}
              />

              <label className="sr-only" htmlFor="og_site">
                Facebook site name
              </label>
              <input
                value={form.og_site}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="og_site"
                id="og_site"
                type="text"
                placeholder="Site name"
              />
            </div>

            <p className="font-semibold text-xl tracking-tight mt-6">Twitter</p>
            <div className="sm:flex w-full">
              <label className="sr-only" htmlFor="twitter_title">
                Twitter title
              </label>
              <input
                value={form.twitter_title}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="twitter_title"
                id="twitter_title"
                type="text"
                placeholder="Title"
                maxLength={50}
              />

              <label className="sr-only" htmlFor="twitter_desc">
                Twitter description
              </label>
              <input
                value={form.twitter_desc}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="twitter_desc"
                id="twitter_desc"
                type="text"
                placeholder="Description"
                maxLength={200}
              />
            </div>

            <div className="sm:flex w-full">
              <label className="sr-only" htmlFor="twitter_img_src">
                Twitter image
              </label>
              <input
                onChange={handleFileInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="twitter_img_src"
                id="twitter_img_src"
                type="file"
                accept="image/png, image/jpeg"
                multiple={false}
              />

              <label className="sr-only" htmlFor="twitter_img_alt">
                Twitter image alt
              </label>
              <input
                value={form.twitter_img_alt}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="twitter_img_alt"
                id="twitter_img_alt"
                type="text"
                placeholder="Image alt"
              />
            </div>

            <div className="sm:flex w-full">
              <label className="sr-only" htmlFor="twitter_site_acc">
                Twitter site account
              </label>
              <input
                value={form.twitter_site_acc}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="twitter_site_acc"
                id="twitter_site_acc"
                type="text"
                placeholder="Site account"
              />

              <label className="sr-only" htmlFor="twitter_author_acc">
                Twitter author account
              </label>
              <input
                value={form.twitter_author_acc}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="twitter_author_acc"
                id="twitter_author_acc"
                type="text"
                placeholder="Author account"
              />
            </div>

            <p className="font-semibold text-xl tracking-tight mt-6">Google</p>
            <div className="sm:flex w-full">
              <label className="sr-only" htmlFor="google_title">
                Google title
              </label>
              <input
                value={form.google_title}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="google_title"
                id="google_title"
                type="text"
                placeholder="Title"
                maxLength={50}
              />

              <label className="sr-only" htmlFor="google_desc">
                Google description
              </label>
              <input
                value={form.google_desc}
                onChange={handleInput}
                className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
                name="google_desc"
                id="google_desc"
                type="text"
                placeholder="Description"
                maxLength={160}
              />
            </div>

            <label className="sr-only" htmlFor="google_img_src">
              Google image
            </label>
            <input
              onChange={handleFileInput}
              className="w-full flex-grow px-3 py-2 my-1 border rounded sm:mr-2 placeholder-gray-800"
              name="google_img_src"
              id="google_img_src"
              type="file"
              accept="image/png, image/jpeg"
              multiple={false}
            />

            <button
              disabled={isLoading}
              className="block w-full lg:w-auto flex-shrink-0 px-3 py-2 my-1 border rounded bg-orange-700 text-white border-orange-700 hover:opacity-75 mt-6"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default LinkEditPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx?.params?.slug
  const linkRes = await fetch(`${process.env.BASE_URL}/api/links/${slug}`)
  const linkJSON = await linkRes.json()
  const {link} = linkJSON

  return {props: {link, slug}}
}

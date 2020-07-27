import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import {GetServerSideProps} from 'next'
import {FormEvent, SyntheticEvent, useReducer} from 'react'

import {
  GooglePreview,
  OGPreview,
  TwitterPreview,
} from '../../components/share-previews'
import Layout from '../../components/site-layout'
import {useUpdateLink} from '../../hooks'
import {Link, LinkMeta} from '../../interfaces'
import {removeURLScheme, removeWebHostString} from '../../utils'

const tabStyles =
  'edit-tab no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs md:text-base py-3 mr-3 md:mr-8 hover:opacity-50'
const inputWrapperStyles = 'w-full flex-grow my-1'
const inputFirstWrapperStyles = 'w-full flex-grow my-1 sm:mr-2'
const inputStyles = 'w-full my-1 px-3 py-2 border rounded placeholder-gray-800'
const labelStyles = 'block font-semibold text-xl mx-2 mt-4'

type Props = {
  link: Link
  slug: string
}

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
          <a
            className="block md:text-center mt-3 md:mt-8 text-gray-500 hover:text-gray-900 leading-tight"
            target="_blank"
            rel="noopener noreferrer"
            href={link.target}
          >
            {removeWebHostString(removeURLScheme(link.target))}
          </a>
          <h1 className="font-bold text-4xl md:text-6xl lg:text-center mb-3 md:mb-8 text-gray-900 leading-tight">
            Edit /{slug}
          </h1>

          <form onSubmit={handleSubmit}>
            <Tabs>
              <TabList className="-mb-px flex md:justify-center overflow-scroll">
                <Tab className={tabStyles}>General</Tab>
                <Tab className={tabStyles}>Twitter</Tab>
                <Tab className={tabStyles}>Facebook</Tab>
                <Tab className={tabStyles}>Google</Tab>
              </TabList>
              <TabPanels className="max-w-4xl mx-auto">
                <TabPanel>
                  <p className="sr-only">General</p>

                  <OGPreview title={form.title} desc={form.desc} />

                  <div className="sm:flex w-full">
                    <div className={inputFirstWrapperStyles}>
                      <label className={labelStyles} htmlFor="title">
                        Title
                      </label>
                      <input
                        value={form.title}
                        onChange={handleInput}
                        className={inputStyles}
                        name="title"
                        id="title"
                        type="text"
                        placeholder="Awesome link"
                        maxLength={50}
                      />
                    </div>

                    <div className={inputWrapperStyles}>
                      <label className={labelStyles} htmlFor="desc">
                        Description
                      </label>
                      <input
                        value={form.desc}
                        onChange={handleInput}
                        className={inputStyles}
                        name="desc"
                        id="desc"
                        type="text"
                        placeholder="An awesome place on the internet"
                        maxLength={160}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p className="sr-only">Twitter</p>

                  <TwitterPreview
                    img={form.twitter_img_src}
                    title={form.twitter_title}
                    desc={form.twitter_desc}
                  />

                  <div className="sm:flex w-full">
                    <div className={inputFirstWrapperStyles}>
                      <label className={labelStyles} htmlFor="twitter_title">
                        Title
                      </label>
                      <input
                        value={form.twitter_title}
                        onChange={handleInput}
                        className={inputStyles}
                        name="twitter_title"
                        id="twitter_title"
                        type="text"
                        placeholder="Awesome link"
                        maxLength={50}
                      />
                    </div>

                    <div className={inputWrapperStyles}>
                      <label className={labelStyles} htmlFor="twitter_desc">
                        Description
                      </label>
                      <input
                        value={form.twitter_desc}
                        onChange={handleInput}
                        className={inputStyles}
                        name="twitter_desc"
                        id="twitter_desc"
                        type="text"
                        placeholder="An awesome place on the internet"
                        maxLength={200}
                      />
                    </div>
                  </div>

                  <div className="sm:flex w-full">
                    <div className={inputFirstWrapperStyles}>
                      <label className={labelStyles} htmlFor="twitter_img_src">
                        Image
                      </label>
                      <input
                        onChange={handleFileInput}
                        className={inputStyles}
                        name="twitter_img_src"
                        id="twitter_img_src"
                        type="file"
                        accept="image/png, image/jpeg"
                        multiple={false}
                      />
                    </div>

                    <div className={inputWrapperStyles}>
                      <label className={labelStyles} htmlFor="twitter_img_alt">
                        Image alt
                      </label>
                      <input
                        value={form.twitter_img_alt}
                        onChange={handleInput}
                        className={inputStyles}
                        name="twitter_img_alt"
                        id="twitter_img_alt"
                        type="text"
                        placeholder="A flower"
                      />
                    </div>
                  </div>

                  <div className="sm:flex w-full">
                    <div className={inputFirstWrapperStyles}>
                      <label className={labelStyles} htmlFor="twitter_site_acc">
                        Twitter site account
                      </label>
                      <input
                        value={form.twitter_site_acc}
                        onChange={handleInput}
                        className={inputStyles}
                        name="twitter_site_acc"
                        id="twitter_site_acc"
                        type="text"
                        placeholder="@reddit"
                      />
                    </div>

                    <div className={inputWrapperStyles}>
                      <label
                        className={labelStyles}
                        htmlFor="twitter_author_acc"
                      >
                        Twitter author account
                      </label>
                      <input
                        value={form.twitter_author_acc}
                        onChange={handleInput}
                        className={inputStyles}
                        name="twitter_author_acc"
                        id="twitter_author_acc"
                        type="text"
                        placeholder="@shwilliam"
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p className="sr-only">Facebook</p>

                  <OGPreview
                    img={form.og_img_src}
                    title={form.og_title}
                    desc={form.og_desc}
                  />

                  <div className="sm:flex w-full">
                    <div className={inputFirstWrapperStyles}>
                      <label className={labelStyles} htmlFor="og_title">
                        Title
                      </label>
                      <input
                        value={form.og_title}
                        onChange={handleInput}
                        className={inputStyles}
                        name="og_title"
                        id="og_title"
                        type="text"
                        placeholder="Awesome link"
                        maxLength={50}
                      />
                    </div>

                    <div className={inputWrapperStyles}>
                      <label className={labelStyles} htmlFor="og_desc">
                        Description
                      </label>
                      <input
                        value={form.og_desc}
                        onChange={handleInput}
                        className={inputStyles}
                        name="og_desc"
                        id="og_desc"
                        type="text"
                        placeholder="An awesome place on the internet"
                        maxLength={160}
                      />
                    </div>
                  </div>

                  <div className="sm:flex w-full">
                    <div className={inputFirstWrapperStyles}>
                      <label className={labelStyles} htmlFor="og_site">
                        Site name
                      </label>
                      <input
                        value={form.og_site}
                        onChange={handleInput}
                        className={inputStyles}
                        name="og_site"
                        id="og_site"
                        type="text"
                        placeholder="Awesome site"
                      />
                    </div>

                    <div className={inputWrapperStyles}>
                      <label className={labelStyles} htmlFor="og_img_src">
                        Image
                      </label>
                      <input
                        onChange={handleFileInput}
                        className={inputStyles}
                        name="og_img_src"
                        id="og_img_src"
                        type="file"
                        accept="image/png, image/jpeg"
                        multiple={false}
                      />
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p className="sr-only">Google</p>

                  <GooglePreview
                    img={form.google_img_src}
                    title={form.google_title}
                    desc={form.google_desc}
                  />

                  <div className="sm:flex w-full">
                    <div className={inputFirstWrapperStyles}>
                      <label className={labelStyles} htmlFor="google_title">
                        Title
                      </label>
                      <input
                        value={form.google_title}
                        onChange={handleInput}
                        className={inputStyles}
                        name="google_title"
                        id="google_title"
                        type="text"
                        placeholder="Awesome link"
                        maxLength={50}
                      />
                    </div>

                    <div className={inputWrapperStyles}>
                      <label className={labelStyles} htmlFor="google_desc">
                        Description
                      </label>
                      <input
                        value={form.google_desc}
                        onChange={handleInput}
                        className={inputStyles}
                        name="google_desc"
                        id="google_desc"
                        type="text"
                        placeholder="An awesome place on the internet"
                        maxLength={160}
                      />
                    </div>
                  </div>

                  <div className={inputWrapperStyles}>
                    <label className={labelStyles} htmlFor="google_img_src">
                      Image
                    </label>
                    <input
                      onChange={handleFileInput}
                      className={inputStyles}
                      name="google_img_src"
                      id="google_img_src"
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple={false}
                    />
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <div className="flex justify-end max-w-4xl mx-auto">
              <button
                disabled={isLoading}
                className="block w-full lg:w-auto flex-shrink-0 px-6 py-2 my-1 border rounded bg-orange-600 text-white border-orange-600 hover:opacity-75 mt-12"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx?.params?.slug
  const linkRes = await fetch(
    `${process.env.BASE_URL}/api/links/${slug}`,
  )
  const linkJSON = await linkRes.json()
  const {link} = linkJSON

  return {props: {link, slug}}
}

export default LinkEditPage

import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs'
import {GetServerSideProps} from 'next'
import {ChangeEvent, FormEvent, ReactNode, useReducer} from 'react'

import Button from '../../components/button'
import LabelledInput from '../../components/labelled-input'
import PageHeader from '../../components/page-header'
import PageWrapper from '../../components/page-wrapper'
import {
  GooglePreview,
  OGPreview,
  TwitterPreview,
} from '../../components/share-previews'
import Layout from '../../components/site-layout'
import {useUpdateLink, useViewerSubscription} from '../../hooks'
import {AuthToken, Link, LinkMeta} from '../../interfaces'
import {
  omitNull,
  removeURLScheme,
  removeWebHostString,
  validateHeaderToken,
} from '../../lib'

type Props = {
  link: Link
  slug: string
  token: AuthToken
}

const StyledTab = ({children}: {children?: ReactNode}) => (
  <Tab className="edit-tab no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs md:text-base py-3 mr-3 md:mr-8 hover:opacity-50">
    {children}
  </Tab>
)

const SubscriptionNote = () => (
  <p className="font-serif italic lg:text-center py-2 lg:mb-4">
    (Subscribe to customize preview image)
  </p>
)

type LinkEditFormAction = {
  type: 'INPUT'
  payload: {name: string; value: string}
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
  og_img_src: 'http://microgradient.herokuapp.com/timpope/200,100.png',
  og_site: '',
  twitter_title: '',
  twitter_desc: '', // <200 chars
  twitter_img_alt: '',
  twitter_img_src: 'http://microgradient.herokuapp.com/timpope/200,100.png', // >280x150
  twitter_site_acc: '',
  twitter_author_acc: '',
  google_title: '',
  google_desc: '',
  google_img_src: 'http://microgradient.herokuapp.com/timpope/200,100.png',
}

const LinkEditPage = ({link, slug, token}: Props) => {
  const [updateLink, {isLoading}] = useUpdateLink()
  const viewerSubscription = useViewerSubscription()
  const isActiveSubscriber =
    viewerSubscription?.subscription?.status === 'active'
  const [form, dispatch] = useReducer(linkEditFormReducer, {
    ...defaultLinkData,
    ...omitNull(link),
  })

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({type: 'INPUT', payload: e.target})

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!isActiveSubscriber) return
    try {
      const files = e.target.files as FileList
      const file = files[0]

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
    } catch (error) {
      console.error({error})
      // TODO
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await updateLink({...form, slug})
    alert('✨')
  }

  return (
    <Layout title={`edit ${slug} ~ liten`} isAuthenticated={!!token}>
      <div className="py-8 pb-10 sm:py-10 sm:pb-12">
        <PageHeader
          title={`Edit /${slug}`}
          subtitle={
            <a
              className="block md:text-center mt-3 md:mt-8 text-gray-500 hover:text-gray-900 leading-tight"
              target="_blank"
              rel="noopener noreferrer"
              href={link.target}
            >
              {removeWebHostString(removeURLScheme(link.target))}
            </a>
          }
        />

        <PageWrapper>
          <form onSubmit={handleSubmit}>
            <Tabs className="outline-none">
              <TabList className="-mb-px flex md:justify-center overflow-scroll">
                <StyledTab>General</StyledTab>
                <StyledTab>Twitter</StyledTab>
                <StyledTab>Facebook</StyledTab>
                <StyledTab>Google</StyledTab>
              </TabList>
              <TabPanels className="max-w-4xl mx-auto">
                <TabPanel>
                  <p className="sr-only">General</p>

                  <OGPreview title={form.title} desc={form.desc} />

                  <div className="sm:flex w-full">
                    <LabelledInput
                      value={form.title}
                      onChange={handleInput}
                      name="title"
                      id="title"
                      type="text"
                      placeholder="Awesome link"
                      maxLength={50}
                      first
                    >
                      Title
                    </LabelledInput>

                    <LabelledInput
                      value={form.desc}
                      onChange={handleInput}
                      name="desc"
                      id="desc"
                      type="text"
                      placeholder="An awesome place on the internet"
                      maxLength={160}
                    >
                      Description
                    </LabelledInput>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p className="sr-only">Twitter</p>

                  <TwitterPreview
                    img={form.twitter_img_src}
                    title={form.twitter_title}
                    desc={form.twitter_desc}
                  />

                  {!isActiveSubscriber && <SubscriptionNote />}

                  <div className="sm:flex w-full">
                    <LabelledInput
                      value={form.twitter_title}
                      onChange={handleInput}
                      name="twitter_title"
                      id="twitter_title"
                      type="text"
                      placeholder="Awesome link"
                      maxLength={50}
                      first
                    >
                      Title
                    </LabelledInput>

                    <LabelledInput
                      value={form.twitter_desc}
                      onChange={handleInput}
                      name="twitter_desc"
                      id="twitter_desc"
                      type="text"
                      placeholder="An awesome place on the internet"
                      maxLength={200}
                    >
                      Description
                    </LabelledInput>
                  </div>

                  <div
                    className={`sm:flex w-full ${
                      isActiveSubscriber ? '' : 'disabled'
                    }`}
                  >
                    <LabelledInput
                      onChange={handleFileInput}
                      name="twitter_img_src"
                      id="twitter_img_src"
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple={false}
                      disabled={!isActiveSubscriber}
                      disabledTitle="Subscription required"
                      first
                    >
                      Image
                    </LabelledInput>

                    <LabelledInput
                      value={form.twitter_img_alt}
                      onChange={handleInput}
                      name="twitter_img_alt"
                      id="twitter_img_alt"
                      type="text"
                      placeholder="A flower"
                      disabled={!isActiveSubscriber}
                      disabledTitle="Subscription required"
                    >
                      Image alt
                    </LabelledInput>
                  </div>

                  <div className="sm:flex w-full">
                    <LabelledInput
                      value={form.twitter_site_acc}
                      onChange={handleInput}
                      name="twitter_site_acc"
                      id="twitter_site_acc"
                      type="text"
                      placeholder="@mycompany"
                      first
                    >
                      Company account
                    </LabelledInput>

                    <LabelledInput
                      value={form.twitter_author_acc}
                      onChange={handleInput}
                      name="twitter_author_acc"
                      id="twitter_author_acc"
                      type="text"
                      placeholder="@me"
                    >
                      Author account
                    </LabelledInput>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p className="sr-only">Facebook</p>

                  <OGPreview
                    img={form.og_img_src}
                    title={form.og_title}
                    desc={form.og_desc}
                  />

                  {!isActiveSubscriber && <SubscriptionNote />}

                  <div className="sm:flex w-full">
                    <LabelledInput
                      value={form.og_title}
                      onChange={handleInput}
                      name="og_title"
                      id="og_title"
                      type="text"
                      placeholder="Awesome link"
                      maxLength={50}
                      first
                    >
                      Title
                    </LabelledInput>

                    <LabelledInput
                      value={form.og_desc}
                      onChange={handleInput}
                      name="og_desc"
                      id="og_desc"
                      type="text"
                      placeholder="An awesome place on the internet"
                      maxLength={160}
                    >
                      Description
                    </LabelledInput>
                  </div>

                  <div className="sm:flex w-full">
                    <LabelledInput
                      value={form.og_site}
                      onChange={handleInput}
                      name="og_site"
                      id="og_site"
                      type="text"
                      placeholder="Awesome site"
                      first
                    >
                      Site name
                    </LabelledInput>

                    <LabelledInput
                      onChange={handleFileInput}
                      name="og_img_src"
                      id="og_img_src"
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple={false}
                      disabled={!isActiveSubscriber}
                      disabledTitle="Subscription required"
                    >
                      Image
                    </LabelledInput>
                  </div>
                </TabPanel>
                <TabPanel>
                  <p className="sr-only">Google</p>

                  <GooglePreview
                    img={form.google_img_src}
                    title={form.google_title}
                    desc={form.google_desc}
                  />

                  {!isActiveSubscriber && <SubscriptionNote />}

                  <div className="sm:flex w-full">
                    <LabelledInput
                      value={form.google_title}
                      onChange={handleInput}
                      name="google_title"
                      id="google_title"
                      type="text"
                      placeholder="Awesome link"
                      maxLength={50}
                      first
                    >
                      Title
                    </LabelledInput>

                    <LabelledInput
                      value={form.google_desc}
                      onChange={handleInput}
                      name="google_desc"
                      id="google_desc"
                      type="text"
                      placeholder="An awesome place on the internet"
                      maxLength={160}
                    >
                      Description
                    </LabelledInput>
                  </div>

                  <LabelledInput
                    onChange={handleFileInput}
                    name="google_img_src"
                    id="google_img_src"
                    type="file"
                    accept="image/png, image/jpeg"
                    multiple={false}
                    disabled={!isActiveSubscriber}
                    disabledTitle="Subscription required"
                  >
                    Image
                  </LabelledInput>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <div className="flex justify-end max-w-4xl mx-auto">
              <Button
                disabled={isLoading}
                className="w-full lg:w-auto flex-shrink-0 mb-2 mt-8"
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </PageWrapper>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = validateHeaderToken(ctx.req.headers)

  const slug = ctx?.params?.slug
  const linkRes = await fetch(`${process.env.BASE_URL}/api/links/${slug}`)
  const linkJSON = await linkRes.json()
  const {link} = linkJSON

  return {props: {link, slug, token}}
}

export default LinkEditPage

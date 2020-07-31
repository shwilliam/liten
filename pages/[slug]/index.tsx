import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {useMount} from 'react-use'

import {Link} from '../../interfaces'

type Props = {
  link: Link
}

const LinkPage = ({link}: Props) => {
  const {
    slug,
    title,
    desc,
    og_title,
    og_desc,
    og_img_src,
    og_site,
    twitter_title,
    twitter_desc,
    twitter_img_alt,
    twitter_img_src,
    twitter_site_acc,
    twitter_author_acc,
    google_title,
    google_desc,
    google_img_src,
  } = link

  useMount(async () => {
    await fetch(`/api/links/${slug}/view`)
    window?.location.replace(link.target)
  })

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      {/* < 50 chars */}
      <title>{title}</title>
      <meta name="title" content={title} />
      {/* < 160 chars */}
      <meta name="description" content={desc} />

      {/* open graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={og_title} />
      <meta property="og:description" content={og_desc} />
      <meta property="og:image" content={og_img_src} />
      <meta property="og:url" content={`${process.env.BASE_URL}/${slug}`} />
      <meta property="og:site_name" content={og_site} />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`${process.env.BASE_URL}/${slug}`}
      />
      <meta property="twitter:title" content={twitter_title} />
      {/* < 200 chars */}
      <meta name="twitter:description" content={twitter_desc} />
      <meta name="twitter:image:alt" content={twitter_img_alt} />
      {/* prefix w '@' */}
      <meta name="twitter:site" content={twitter_site_acc} />
      <meta name="twitter:creator" content={twitter_author_acc} />
      {/* > 280x150px */}
      <meta name="twitter:image:src" content={twitter_img_src} />

      {/* schema.org for google */}
      <meta itemProp="name" content={google_title} />
      <meta itemProp="description" content={google_desc} />
      <meta itemProp="image" content={google_img_src} />
    </Head>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx?.params?.slug
  const linkRes = await fetch(`${process.env.BASE_URL}/api/links/${slug}`)
  const linkJSON = await linkRes.json()
  const {link} = linkJSON

  return {props: {link}}
}

export default LinkPage

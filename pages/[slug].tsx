import {GetServerSideProps} from 'next'
import Head from 'next/head'
import {useMount} from 'react-use'

import {Link} from '../interfaces'

type Props = {
  link: Link
}

const LinkPage = ({link}: Props) => {
  useMount(() => {
    window?.location.replace(link.target)
  })

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      {/* < 50 chars */}
      <title>site title</title>
      <meta name="title" content="site meta title" />

      {/* < 160 chars */}
      <meta name="description" content="site description" />

      {/* open graph */}
      <meta property="og:title" content="og title" />
      <meta property="og:description" content="og description" />
      <meta
        property="og:image"
        content="https://microgradient.herokuapp.com/og.png"
      />
      <meta property="og:url" content={process.env.BASE_URL} />
      <meta property="og:site_name" content="og site name" />

      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={process.env.BASE_URL} />
      <meta property="twitter:title" content="twitter title" />
      {/* < 200 chars */}
      <meta name="twitter:description" content="twitter description" />
      <meta name="twitter:image:alt" content="twitter image alt" />
      <meta name="twitter:site" content="@twitter_site_username" />
      <meta name="twitter:creator" content="@twitter_author_username" />
      {/* > 280x150px */}
      <meta
        name="twitter:image:src"
        content="https://microgradient.herokuapp.com/og/300,200.png"
      />

      {/* schema.org for google */}
      <meta itemProp="name" content="google name" />
      <meta itemProp="description" content="google description" />
      <meta
        itemProp="image"
        content="https://microgradient.herokuapp.com/google.png"
      />
    </Head>
  )
}

export default LinkPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx?.params?.slug
  const linkRes = await fetch(`${process.env.BASE_URL}/api/links/${slug}`)
  const linkJSON = await linkRes.json()
  const {link} = linkJSON

  return {props: {link}}
}

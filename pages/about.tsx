import {GetServerSideProps} from 'next'
import Link from 'next/link'

import Layout from '../components/site-layout'
import {AuthToken} from '../interfaces'
import {validateHeaderToken} from '../lib'

type Props = {
  token: AuthToken
}

const AboutPage = ({token}: Props) => (
  <Layout title="about ~ liten" isAuthenticated={!!token}>
    <h1>About</h1>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const token = validateHeaderToken(ctx.req.headers)

  return {props: {token}}
}

export default AboutPage

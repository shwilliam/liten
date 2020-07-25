import Link from 'next/link'

import Layout from '../components/site-layout'

const AboutPage = () => (
  <Layout title="about ~ liten">
    <h1>About</h1>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage

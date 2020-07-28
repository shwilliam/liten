import Link from 'next/link'

import Layout from '../components/site-layout'

const AboutPage = () => (
  <Layout title="about ~ liten">
    <h2>About</h2>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage

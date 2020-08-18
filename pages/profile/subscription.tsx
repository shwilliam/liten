import {GetServerSideProps} from 'next'

import LinkButton from '../../components/link-button'
import PageHeader from '../../components/page-header'
import Layout from '../../components/site-layout'
import {validateHeaderToken} from '../../lib'

const ProfilePage = () => (
  <Layout title="subscription ~ liten" isAuthenticated={true}>
    <PageHeader title="Successfully subscribed!" subtitle="Thank you!" />

    <div className="container px-4 sm:px-16 lg:px-16 xl:px-20 mx-auto sm:text-center max-w-4xl">
      <p className="text-xl md:text-2xl text-gray-900 leading-tight my-16 sm:my-32">
        Thank you for supporting liten.xyz! You can now customize your short
        links with your own images that will appear as your links are shared.
      </p>
      <LinkButton href="/dashboard" invert>
        To your dashboard
      </LinkButton>
    </div>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async ctx => {
  const token = validateHeaderToken(ctx.req.headers)

  if (!token)
    ctx.res
      .writeHead(301, {
        Location: '/login',
      })
      .end()

  return {props: {}}
}

export default ProfilePage

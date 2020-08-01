import {GetServerSideProps} from 'next'

import PageHeader from '../../components/page-header'
import Layout from '../../components/site-layout'
import {validateHeaderToken} from '../../lib'

const ProfilePage = () => (
  <Layout title="subscription ~ liten" isAuthenticated={true}>
    <PageHeader title="Subscribed!" />
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

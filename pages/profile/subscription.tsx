import {GetServerSideProps} from 'next'

import Layout from '../../components/site-layout'
import {validateHeaderToken} from '../../utils'

const ProfilePage = () => (
  <Layout title="subscription ~ liten" isAuthenticated={true}>
    <h1>Subscribed!</h1>
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

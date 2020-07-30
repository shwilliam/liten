import {loadStripe} from '@stripe/stripe-js'
import {GetServerSideProps} from 'next'
import {useRouter} from 'next/router'

import Layout from '../../components/site-layout'
import {useCreateSubscription, useViewerSubscription} from '../../hooks'
import {validateHeaderToken} from '../../lib'

const {NEXT_PUBLIC_STRIPE_PUBLIC_KEY} = process.env
const stripePromise = NEXT_PUBLIC_STRIPE_PUBLIC_KEY
  ? loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : null

const ProfilePage = () => {
  const viewerSubscription = useViewerSubscription()
  const createSubscription = useCreateSubscription()
  const router = useRouter()

  const doSubscribe = async () => {
    try {
      const sessionId = await createSubscription()

      if (!sessionId) throw new Error('Error creating checkout session')

      const stripe = await stripePromise
      const checkoutResult = await stripe?.redirectToCheckout({
        sessionId,
      })

      if (checkoutResult?.error) throw new Error(checkoutResult.error.message)
    } catch (error) {
      if (error.message.match(/already subscribed/gi))
        console.error(
          'Subscription request cancelled. User already has an active subscription.',
        )
      else console.error(error.message)
      // TODO
    }
  }

  const doUnsubscribe = async () => {
    try {
      await fetch('/api/checkout/unsubscribe', {
        method: 'DELETE',
      })

      router.reload()
    } catch (error) {
      console.error({error})
      // TODO
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
      })

      router.push('/')
    } catch (error) {
      console.error({error})
      // TODO
    }
  }

  return (
    <Layout title="profile ~ liten" isAuthenticated={true}>
      <h1>Profile</h1>
      <button onClick={logout}>Log out</button>

      {!viewerSubscription ? (
        'Loading subscription...'
      ) : viewerSubscription.subscription?.status === 'active' ? (
        <p>
          You are subscribed!{' '}
          <span role="img" aria-label="Sparkles">
            ✨
          </span>
          <button onClick={doUnsubscribe}>Unsubscribe</button>
        </p>
      ) : (
        <button onClick={doSubscribe}>Subscribe</button>
      )}
    </Layout>
  )
}

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

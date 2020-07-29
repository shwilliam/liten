import {loadStripe} from '@stripe/stripe-js'

import Layout from '../../components/site-layout'
import {useCreateSubscription} from '../../hooks'

const {NEXT_PUBLIC_STRIPE_PUBLIC_KEY} = process.env
const stripePromise =
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY && loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const ProfilePage = () => {
  const createSubscription = useCreateSubscription()

  const doSubscribe = async () => {
    try {
      const sessionId = await createSubscription()

      if (!sessionId) {
        // TODO
        return
      }

      const stripe = (await stripePromise) as any
      const {error} = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
      } // TODO
    } catch (err) {} // TODO
  }

  return (
    <Layout title="profile ~ liten">
      <h2>Profile</h2>

      <button onClick={doSubscribe}>Subscribe</button>
    </Layout>
  )
}

export default ProfilePage

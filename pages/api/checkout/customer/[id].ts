import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'
import Stripe from 'stripe'

const {STRIPE_SECRET_KEY} = process.env

const stripe =
  STRIPE_SECRET_KEY &&
  (new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2020-03-02',
  }) as any)

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const {id} = req.query

    const customer = await stripe.customers.retrieve(id)

    const isActiveSubscriber = customer.subscriptions.data.some(
      (sub: any) =>
        sub.plan.id === process.env.STRIPE_SUBSCRIPTION_PRODUCT &&
        sub.plan.active === true,
    )

    res.json({...customer, isActiveSubscriber})
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  }
})

export default handler

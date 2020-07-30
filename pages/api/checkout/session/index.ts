import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'
import Stripe from 'stripe'

import {validateHeaderToken} from '../../../../utils'

const {STRIPE_SECRET_KEY} = process.env

const stripe =
  STRIPE_SECRET_KEY &&
  (new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2020-03-02',
  }) as any)

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  try {
    const token = validateHeaderToken(req.headers)
    const {stripeId} = req.body

    if (!token || !stripeId) res.status(401).end()

    const session = await stripe?.checkout.sessions.create({
      customer: stripeId,
      success_url: `${req.headers.origin}/profile/subscription?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/profile#subscription_error`,
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRODUCT,
          quantity: 1,
        },
      ],
      mode: 'subscription',
    })

    res.json({sessionId: session.id})
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  }
})

export default handler

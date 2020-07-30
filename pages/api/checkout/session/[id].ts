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
    const session = await stripe.checkout.sessions.retrieve(id)

    res.json(session)
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  }
})

export default handler

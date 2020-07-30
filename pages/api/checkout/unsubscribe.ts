import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'
import Stripe from 'stripe'

import {validateHeaderToken} from '../../../utils'

const {STRIPE_SECRET_KEY} = process.env

const stripe =
  STRIPE_SECRET_KEY &&
  (new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2020-03-02',
  }) as any)

const handler = nc<NextApiRequest, NextApiResponse>()

handler.delete(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const token = validateHeaderToken(req.headers)
    if (!token) {
      res
        .status(401)
        .json({error: {message: 'Missing or invalid authorization token'}})
      return
    }

    const {email} = token
    const user = await prisma.user.findOne({where: {email}})
    if (!user) {
      res.status(401).json({error: {message: 'Invalid authorization token'}})
      return
    }

    const {stripeId} = user

    const customer = await stripe.customers.retrieve(stripeId)
    const subscription = customer.subscriptions.data.find(
      (sub: any) =>
        sub.plan.id === process.env.STRIPE_SUBSCRIPTION_PRODUCT &&
        sub.plan.active === true,
    )

    if (!subscription) {
      res.status(400).json({error: {message: 'No active subscription found'}})
      return
    }

    const cancelledSubscription = await stripe.subscriptions.del(
      subscription.id,
    )
    res.json(cancelledSubscription)
  } catch (error) {
    console.log({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler

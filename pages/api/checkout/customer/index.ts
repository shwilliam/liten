import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'
import Stripe from 'stripe'

import {validateHeaderToken} from '../../../../lib'

const stripe: any = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-03-02',
})

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const token = validateHeaderToken(req.headers)
    if (!token) res.status(401).end()

    const email = token?.email
    let user = await prisma.user.findOne({where: {email}})

    if (!user) {
      // TODO
      return
    }

    let customerId = user.stripeId

    if (customerId) {
      const customer = await stripe.customers.retrieve(customerId)
      const isActiveSubscriber = customer.subscriptions.data.some(
        (sub: any) =>
          sub.plan.id === process.env.STRIPE_SUBSCRIPTION_PRODUCT &&
          sub.plan.active === true,
      )

      if (isActiveSubscriber) {
        res.status(409).json({error: {message: 'Already subscribed'}})
        return
      }
    } else {
      const customer = await stripe?.customers.create({
        email: user.email,
      })
      customerId = customer.id
      user = await prisma.user.update({
        where: {email},
        data: {
          stripeId: customerId,
        },
      })
    }

    res.json({user})
  } catch (error) {
    console.error({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler

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

handler.post(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const token = validateHeaderToken(req.headers)
    if (!token) res.status(401).end()

    const email = token?.email
    const user = await prisma.user.findOne({where: {email}})

    if (!user) {
      // TODO
      return
    }

    let customerId = user.stripeId

    if (!customerId) {
      const customer = await stripe?.customers.create({
        email: user.email,
      })
      customerId = customer.id
      await prisma.user.update({
        where: {email},
        data: {
          stripeId: customerId,
        },
      })
    }

    res.json({customerId: customerId})
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler

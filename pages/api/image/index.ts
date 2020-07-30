import {PrismaClient} from '@prisma/client'
import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
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

const upload = multer({dest: '/tmp'})
const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(upload.single('image'), async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const token = validateHeaderToken(req.headers)
    if (!token) {
      res
        .status(401)
        .json({error: {message: 'Missing or invalid authorization token'}})
      return
    }

    const email = token?.email
    const user = await prisma.user.findOne({where: {email}})

    if (!user) {
      res
        .status(401)
        .json({error: {message: 'Missing or invalid authorization token'}})
      return
    }

    const customerId = user.stripeId

    if (!customerId) {
      res.status(401).json({error: {message: 'No active subscription found'}})
      return
    }

    const customer = await stripe.customers.retrieve(customerId)
    const isActiveSubscriber = customer.subscriptions.data.some(
      (sub: any) =>
        sub.plan.id === process.env.STRIPE_SUBSCRIPTION_PRODUCT &&
        sub.plan.active === true,
    )

    if (!isActiveSubscriber) {
      res.status(401).json({error: {message: 'No active subscription found'}})
      return
    }

    if (!req.file) throw new Error('No file to upload')

    const image = await cloudinary.uploader.upload(req.file.path, {
      width: 512,
      height: 512,
      crop: 'fill',
    })

    res.json({image})
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  } finally {
    await prisma.disconnect()
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler

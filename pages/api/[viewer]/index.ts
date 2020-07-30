import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

import {validateHeaderToken} from '../../../utils'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.post(async (req, res) => {
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

    res.json(user)
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler

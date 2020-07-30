import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

import {validateHeaderToken} from '../../../lib'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const token = validateHeaderToken(req.headers)

    const {slug, target} = req.body

    const link = token?.email
      ? await prisma.link.create({
          data: {
            author: {
              connect: {
                email: token.email,
              },
            },
            slug: slug,
            target: target,
          },
        })
      : await prisma.link.create({
          data: {
            slug: slug,
            target: target,
          },
        })

    res.status(201).json({link})
  } catch (error) {
    console.error({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
}

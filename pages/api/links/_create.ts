import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const {slug, target} = req.body

    const link = await prisma.link.create({
      data: {
        slug: slug,
        target: target,
      },
    })

    res.status(201).json({link})
  } catch (err) {
    res.status(500).json({error: {message: err.message}})
  } finally {
    await prisma.disconnect()
  }
}

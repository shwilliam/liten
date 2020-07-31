import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const {slug} = req.query
    const link = await prisma.link.findOne({where: {slug: slug as string}})

    if (!link) {
      res.status(400).json({error: {message: 'No link found'}})
      return
    }

    const updatedLink = await prisma.link.update({
      where: {slug: slug as string},
      data: {views: link.views + 1},
    })

    res.json({link: updatedLink})
  } catch (error) {
    console.error({error})
    res.status(500).json({error: {message: error.message}})
  } finally {
    await prisma.disconnect()
  }
})

export default handler

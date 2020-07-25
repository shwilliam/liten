import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient({log: ['query']})

  try {
    const {
      slug,
      title,
      desc,
      og_title,
      og_desc,
      og_img_src,
      og_site,
      twitter_title,
      twitter_desc,
      twitter_img_alt,
      twitter_img_src,
      twitter_site_acc,
      twitter_author_acc,
      google_title,
      google_desc,
      google_img_src,
    } = req.body

    const link = await prisma.link.update({
      where: {slug},
      data: {
        title,
        desc,
        og_title,
        og_desc,
        og_img_src,
        og_site,
        twitter_title,
        twitter_desc,
        twitter_img_alt,
        twitter_img_src,
        twitter_site_acc,
        twitter_author_acc,
        google_title,
        google_desc,
        google_img_src,
      },
    })

    res.status(200).json({link})
  } catch (err) {
    console.error(err)
    res.status(500).json({statusCode: 500, message: err.message})
  } finally {
    await prisma.disconnect()
  }
}

export type AuthToken = {
  id: string
  email: string
  time: Date
}

export interface Link extends LinkMeta {
  id: number
  slug: string
  target: string
  createdAt: string
  author: string
}

export type LinkMeta = {
  title: string
  desc: string
  og_title: string
  og_desc: string
  og_img_src: string
  og_site: string
  twitter_title: string
  twitter_desc: string
  twitter_img_alt: string
  twitter_img_src: string
  twitter_site_acc: string
  twitter_author_acc: string
  google_title: string
  google_desc: string
  google_img_src: string
}

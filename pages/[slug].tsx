import {GetServerSideProps} from 'next'
import {useMount} from 'react-use'

import Layout from '../components/Layout'
import {Link} from '../interfaces'

type Props = {
  link: Link
}

const LinkPage = ({link}: Props) => {
  useMount(() => {
    window?.location.replace(link.target)
  })

  return <Layout title={'todo ~ liten'}>🥳</Layout>
}

export default LinkPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = ctx?.params?.slug
  const linkRes = await fetch(`${process.env.BASE_URL}/api/links/${slug}`)
  const linkJSON = await linkRes.json()
  const {link} = linkJSON

  return {props: {link}}
}

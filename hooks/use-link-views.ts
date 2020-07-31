import {useQuery} from 'react-query'

export const useLinkViews = (slug: string) => {
  const viewsResponse = useQuery(`linkViews-${slug}`, () =>
    fetch(`/api/links/${slug}/view`).then(res => res.json()),
  )

  return viewsResponse
}

import {useQuery} from 'react-query'

const getViewerLinksViewsRequest = async () => {
  const response = await fetch('/api/viewer/links/views')
  const responseJSON = await response.json()

  return responseJSON
}

export const useViewerLinksViews = () =>
  useQuery('viewerLinksViews', getViewerLinksViewsRequest) // TODO: cache by user id

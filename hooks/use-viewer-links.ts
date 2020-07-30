import {useQuery} from 'react-query'

const getViewerLinksRequest = async () => {
  const response = await fetch('/api/viewer/links')
  const responseJSON = await response.json()

  return responseJSON
}

export const useViewerLinks = () =>
  useQuery('viewerLinks', getViewerLinksRequest) // TODO: cache by user id

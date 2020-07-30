import {useQuery} from 'react-query'

const getViewerRequest = async () => {
  const response = await fetch('/api/viewer', {
    method: 'POST',
  })
  const responseJSON = await response.json()

  return responseJSON
}

export const useViewer = () => useQuery('viewer', getViewerRequest) // TODO: cache by user id

import {useMutation} from 'react-query'

const updateLinkRequest = async (data: any) => {
  const response = await fetch('/api/links/_edit', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseJSON = await response.json()

  return responseJSON.link
}

export const useUpdateLink = () => useMutation(updateLinkRequest)

import {useMutation} from 'react-query'

const claimLocalLinks = async (data: any) => {
  const response = await fetch('/api/links/claim', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseJSON = await response.json()

  return responseJSON
}

export const useClaimLocalLinks = () => useMutation(claimLocalLinks)

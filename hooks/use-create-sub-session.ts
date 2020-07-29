import {useMutation} from 'react-query'

const createSubSessionRequest = async (data: any) => {
  const response = await fetch('/api/checkout/session', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseJSON = await response.json()

  return responseJSON.sessionId
}

export const useCreateSubSession = () => useMutation(createSubSessionRequest)

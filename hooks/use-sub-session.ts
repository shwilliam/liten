import {useQuery} from 'react-query'

export const useSubSession = (id: string) => {
  const session = useQuery(`subSession-${id}`, () =>
    fetch(`/api/checkout/session/${id}`).then(res => res.json()),
  )
  return session
}

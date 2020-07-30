import {useState, useEffect} from 'react'

import {useViewer} from './use-viewer'

export const useViewerSubscription = () => {
  const [activeSubscription, setActiveSubscription] = useState()
  const viewer = useViewer()

  useEffect(() => {
    try {
      ;(async () => {
        if (
          viewer.status === 'success' &&
          viewer.data.stripeId &&
          !activeSubscription
        ) {
          const response = await fetch(
            `/api/checkout/customer/${viewer.data.stripeId}`,
          )
          const responseJSON = await response.json()
          setActiveSubscription(responseJSON)
        }
      })()
    } catch (error) {
      console.error({error})
    }
  })

  return activeSubscription
}

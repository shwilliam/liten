import {useState, useEffect} from 'react'

import {useViewer} from './use-viewer'

export const useViewerSubscription = () => {
  const [activeSubscription, setActiveSubscription] = useState()
  const viewer = useViewer()

  useEffect(() => {
    try {
      if (viewer.status !== 'success' || activeSubscription) {
        return
      }
      ;(async () => {
        if (!viewer.data.stripeId) {
          setActiveSubscription({subscription: {status: 'none'}})
        } else {
          const response = await fetch(
            `/api/checkout/customer/${viewer.data.stripeId}`,
          )
          const responseJSON = await response.json()
          console.log({responseJSON})
          setActiveSubscription(responseJSON)
        }
      })()
    } catch (error) {
      console.error({error})
    }
  })

  return activeSubscription
}

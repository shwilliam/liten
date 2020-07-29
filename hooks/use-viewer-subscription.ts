import {useState} from 'react'

import {useViewer} from './use-viewer'

export const useViewerSubscription = () => {
  const [isActiveSubscriber, setActiveSubscriber] = useState()

  try {
    const viewer = useViewer()

    ;(async () => {
      if (viewer.status === 'success' && viewer.data.stripeId) {
        const response = await fetch(
          `/api/checkout/customer/${viewer.data.stripeId}`,
        )
        const responseJSON = await response.json()

        setActiveSubscriber(responseJSON.isActiveSubscriber ? true : false)
      }
    })()

    return null
  } catch (error) {
    console.log({error})
  } finally {
    return isActiveSubscriber
  }
}

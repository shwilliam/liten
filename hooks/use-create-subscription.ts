import {useCreateSubSession} from './index'

export const useCreateSubscription = () => {
  const [subscribe] = useCreateSubSession()

  const createSubscription = async () => {
    const customerResponse = await fetch('/api/checkout/customer', {
      method: 'POST',
    })
    const customer = await customerResponse.json()
    const sessionId = await subscribe({stripeId: customer.customerId})
    return sessionId
  }

  return createSubscription
}

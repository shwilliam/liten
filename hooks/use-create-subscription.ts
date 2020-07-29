import {useCreateSubSession} from './index'

export const useCreateSubscription = () => {
  const [subscribe] = useCreateSubSession()

  const createSubscription = async () => {
    const customerResponse = await fetch('/api/checkout/customer', {
      method: 'POST',
    })
    const customer = await customerResponse.json()

    if (customer.error) throw new Error(customer.error.message)

    const sessionId = await subscribe({stripeId: customer.user.stripeId})
    return sessionId
  }

  return createSubscription
}

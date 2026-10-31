export const deliveryOptions = [
  {
    id: 1,
    priceCents: 0,
    daysToDelivery: 10
  },
  {
    id: 2,
    priceCents: 499,
    daysToDelivery: 6
  },
  {
    id: 3,
    priceCents: 999,
    daysToDelivery: 1
  }

]

export function renderDaysToDelivery(deliveryOptionId) {
  const matchingItem = deliveryOptions.find(option=>option.id === deliveryOptionId)
  return matchingItem.daysToDelivery
}
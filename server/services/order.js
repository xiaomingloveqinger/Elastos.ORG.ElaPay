import Order from 'models/order'

export function createOrder(options) {
    let {
        elaAmount,
        exchangeRate,
        queryTime,
        orderName,
        orderDesc,
        orderId,
        businessName,
        currency,
        price,
        currencyCode,
        rateAdjustment,
        callbackUrl,
        returnUrl,
        email
    } = options

    let createdDate = new Date()

    const order = new Order({
        elaAmount,
        exchangeRate,
        queryTime,
        orderName,
        orderDesc,
        orderId,
        businessName,
        currency,
        price,
        currencyCode,
        rateAdjustment,
        callbackUrl,
        returnUrl,
        email,
        createdDate
    })

    return order.save()
}

export function getOrder(id) {
    return Order.findById(id)
}

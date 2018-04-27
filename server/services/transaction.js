import Transaction from 'models/transaction'

export function create(options) {
    let {
        transactionHash,
        orderId,
        transactionInfor,
        status
    } = options

    let createdDate = new Date()

    const transaction = new Transaction({
        transactionHash,
        orderId,
        transactionInfor,
        status,
        createdDate
    })

    return transaction.save()
}

export function findById(id) {
    return Transaction.findById(id)
}
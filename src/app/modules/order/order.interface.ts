type IOrderBook = {
    "bookId": string,
    "quantity": number
}

export type IOrderCreatePayload = {
    "orderedBooks": IOrderBook[]
}
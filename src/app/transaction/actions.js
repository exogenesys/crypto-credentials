

export const transactionActions = {
    TRANSACTION_SETUP: "TRANSACTION_SETUP",
    TRANSACTION_START: "TRANSACTION_START",
    TRANSACTION_END: "TRANSACTION_END",
    TRANSACTION_RESET: "TRANSACTION_RESET"
}

export const setupTransaction = (payload) =>  {
    return {
        type: transactionActions.TRANSACTION_SETUP,
        payload: payload
    }
}

export const startTransaction = (payload) =>  {
    return {
        type: transactionActions.TRANSACTION_START,
        payload: payload
    }
}

export const endTransaction = (payload) =>  {
    return {
        type: transactionActions.TRANSACTION_END,
        payload: payload
    }
}

export const resetTransaction = (payload) => {
    return {
        type: transactionActions.TRANSACTION_RESET,
        payload: payload
    }
}
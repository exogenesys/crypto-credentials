export const transactionActions = {
  TRANSACTION_SETUP: "TRANSACTION_SETUP",
  TRANSACTION_START: "TRANSACTION_START",
  TRANSACTION_END: "TRANSACTION_END",
  TRANSACTION_RESET: "TRANSACTION_RESET",
  ADD_TX_INFO: "ADD_TX_INFO",
  TRANSACTION_ERROR: "TRANSACTION_ERROR",
  TRANSACTION_ERROR_RESET: "TRANSACTION_ERROR_RESET",
};

export const setupTransaction = (payload) => ({
    type: transactionActions.TRANSACTION_SETUP,
    payload,
  });

export const startTransaction = (payload) => ({
    type: transactionActions.TRANSACTION_START,
    payload,
  });

export const endTransaction = (payload) => ({
    type: transactionActions.TRANSACTION_END,
    payload,
  });

export const resetTransaction = (payload) => ({
    type: transactionActions.TRANSACTION_RESET,
    payload,
  });

export const addTxInfo = (payload) => ({
    type: transactionActions.ADD_TX_INFO,
    payload,
  });

export const setError = (payload) => ({
    type: transactionActions.TRANSACTION_ERROR,
    payload,
  });

export const resetError = (payload) => ({
    type: transactionActions.TRANSACTION_ERROR_RESET,
    payload,
  });

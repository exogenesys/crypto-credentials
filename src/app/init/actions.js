export const transactionActions = {
  UPDATE_BALANCE: "UPDATE_BALANCE",
  INIT_PROGRAM: "INIT_PROGRAM",
  LOAD_UNIVERSITY_DATA: "LOAD_UNIVERSITY_DATA",
  STORE_NEW_CREDENTIAL_DATA: "STORE_NEW_CREDENTIAL_DATA",
  TRANSACTION_SETUP: "TRANSACTION_SETUP",
  TRANSACTION_START: "TRANSACTION_START",
  TRANSACTION_END: "TRANSACTION_END",
  TRANSACTION_RESET: "TRANSACTION_RESET",
  ADD_TX_INFO: "ADD_TX_INFO",
  TRANSACTION_ERROR: "TRANSACTION_ERROR",
  TRANSACTION_ERROR_RESET: "TRANSACTION_ERROR_RESET",
};
export const storeNewCredentialData = (payload) => {
  return {
    type: transactionActions.STORE_NEW_CREDENTIAL_DATA,
    payload: payload,
  };
};

export const loadUniversityData = (payload) => {
  return {
    type: transactionActions.LOAD_UNIVERSITY_DATA,
    payload: payload,
  };
};

export const initProgram = (payload) => {
  return {
    type: transactionActions.INIT_PROGRAM,
    payload: payload,
  };
};

export const updateBalance = (payload) => {
  return {
    type: transactionActions.UPDATE_BALANCE,
    payload: payload,
  };
};

export const setupTransaction = (payload) => {
  return {
    type: transactionActions.TRANSACTION_SETUP,
    payload: payload,
  };
};

export const startTransaction = (payload) => {
  return {
    type: transactionActions.TRANSACTION_START,
    payload: payload,
  };
};

export const endTransaction = (payload) => {
  return {
    type: transactionActions.TRANSACTION_END,
    payload: payload,
  };
};

export const resetTransaction = (payload) => {
  return {
    type: transactionActions.TRANSACTION_RESET,
    payload: payload,
  };
};

export const addTxInfo = (payload) => {
  return {
    type: transactionActions.ADD_TX_INFO,
    payload: payload,
  };
};

export const setError = (payload) => {
  return {
    type: transactionActions.TRANSACTION_ERROR,
    payload: payload,
  };
};

export const resetError = (payload) => {
  return {
    type: transactionActions.TRANSACTION_ERROR_RESET,
    payload: payload,
  };
};

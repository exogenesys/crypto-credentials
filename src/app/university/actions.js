export const POLLING_STATUS = {
  DEFAULT: "DEFAULT",
  WAITING: "WAITING",
  TRY_AGAIN: "TRY_AGAIN",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const transactionActions = {
  INCREMENT_ACCOUNT_POLLING_COUNT: "INCREMENT_ACCOUNT_POLLING_COUNT",
  RESET_ACCOUNT_POLLING_COUNT: "RESET_ACCOUNT_POLLING_COUNT",
  UPDATE_ACCOUNT_POLLING_STATUS: "UPDATE_ACCOUNT_POLLING_STATUS",
  DISCONNECT_START: "DISCONNECT_START",
  UPDATE_UNIVERSITY_FORM_DATA: "UPDATE_UNIVERSITY_FORM_DATA",
  SET_UNIVERSITY_ACCOUNT_STATUS: "SET_UNIVERSITY_ACCOUNT_STATUS",
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

export const incrementAccountPollingCount = (payload) => ({
  type: transactionActions.INCREMENT_ACCOUNT_POLLING_COUNT,
  payload,
});

export const resetAccountPollingCount = (payload) => ({
  type: transactionActions.RESET_ACCOUNT_POLLING_COUNT,
  payload,
});

export const updateAccountPollingStatus = (payload) => ({
  type: transactionActions.UPDATE_ACCOUNT_POLLING_STATUS,
  payload,
});

export const updateUniversityFormData = (payload) => ({
  type: transactionActions.UPDATE_UNIVERSITY_FORM_DATA,
  payload,
});

export const setUniversityAccountStatus = (payload) => ({
  type: transactionActions.SET_UNIVERSITY_ACCOUNT_STATUS,
  payload,
});

export const storeNewCredentialData = (payload) => ({
  type: transactionActions.STORE_NEW_CREDENTIAL_DATA,
  payload,
});

export const loadUniversityData = (payload) => ({
  type: transactionActions.LOAD_UNIVERSITY_DATA,
  payload,
});

export const initProgram = (payload) => ({
  type: transactionActions.INIT_PROGRAM,
  payload,
});

export const updateBalance = (payload) => ({
  type: transactionActions.UPDATE_BALANCE,
  payload,
});

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

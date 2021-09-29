export const transactionActions = {
  INIT_PROGRAM: "INIT_PROGRAM",
  DISCONNECT_START: "DISCONNECT_START",
};

export const initProgram = (payload) => ({
  type: transactionActions.INIT_PROGRAM,
  payload,
});

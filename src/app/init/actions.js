export const transactionActions = {
  INIT_PROGRAM: "INIT_PROGRAM",
};

export const initProgram = (payload) => ({
    type: transactionActions.INIT_PROGRAM,
    payload,
  });

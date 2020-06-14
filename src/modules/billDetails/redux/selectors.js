export const billDetailsSelector = (state) => {
  return state.billDetails.items;
};

export const billItemFormSelector = (state) => {
  return state.addItem.form;
};

export const addItemLoadingSelector = (state) => {
  return state.addItem.isLoading;
};

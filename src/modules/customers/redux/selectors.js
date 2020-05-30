export const customersSelector = (state) => {
    return state.customers.customers;
}

export const customersLoadingSelector = (state) => {
    return state.customers.isLoading;
}
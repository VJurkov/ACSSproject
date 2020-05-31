export const customersSelector = (state) => {
    const filter = state.customers.searchTerm;
    console.log(filter)
    if(!filter || state.customers.customers.length === 0){
        return state.customers.customers;
    } else {
        return state.customers.customers.filter((customer)=>customer.Surname.includes(filter))
    }
}

export const customersLoadingSelector = (state) => {
    return state.customers.isLoading;
}
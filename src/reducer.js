let initialState = {
    data: [],
    betList: [],
    checkedCount : 0
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'setdata':
            return {
                betList: [...state.betList],
                data: action.data,
                checkedCount : state.checkedCount
            }
        case 'setbetlist':
            return {
                data : [...state.data],
                betList: action.betList,
                checkedCount : state.checkedCount
            }
        case 'setcheckedcount':
            return {
                data : [...state.data],
                betList: [...state.betList],
                checkedCount : action.data
            }

        default:
            return state
    }

}

export default reducer;
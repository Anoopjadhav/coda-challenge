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
        case 'updateperson' : 

        let personData = action.data;
        let tempData = [...state.data];
        tempData.forEach(ele=>{
            if(ele.Name === personData.Name){
                ele.Price = personData.Price;
            }
        })

        let tempBetList = [...state.betList];
        tempBetList.forEach(ele=>{
            if(ele.Name === personData.Name){
                ele.Price = personData.Price;
            }
        })

        return {
            data : [...tempData],
            betList: [...tempBetList],
            checkedCount : action.data
        }

        default:
            return state
    }

}

export default reducer;
const initialState = {
  ctx: undefined
}

//=================================
//============CONSTANTS============
//=================================


//=================================
//=============GETTERS=============
//=================================

const selectReducer = state => state.frame

//=================================
//=============ACTIONS=============
//=================================



//=================================
//=============REDUCER=============
//=================================

const frame = (state = initialState, action) => {
  const {type, payload} = action;
  switch(type){
    default:
      return state
  }
}

export default frame

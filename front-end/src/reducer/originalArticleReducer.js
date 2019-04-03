function OriginalArticleReducer(state,action){
    if(!state){
        return {
            oaid: 0,
            author: 1,
            title:''
        }
    }

    switch(action.type){
        case 'UPDATE_OA_INFO':
            return{
                ...state,
                ...action.newInfo
            }
        default:
            return state;
    }

}

export default OriginalArticleReducer;
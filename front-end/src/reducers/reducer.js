const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const CLEAR_UNREAD_NUM = 'CLEAR_UNREAD_NUM';

function reducer(state,action){
    if(!state){
        return{
            hasLoggedIn:false,
            info:{
                nickname:'',
                uid:0,
                unread_num:0,
                role:'VISITOR'
            }

        }
    }

    let newState;
    switch(action.type){
        case LOG_IN:
            newState = {
                ...state,
                hasLoggedIn:true,
                info:action.info
            };
            break;
        case LOG_OUT:
            newState = {
                ...state,
                hasLoggedIn:false
            };
            break;
        case CLEAR_UNREAD_NUM:
            newState = {
                ...state,
                info:{
                    ...state.info,
                    unread_num:0
                }
            };
            break;
        default:
            return state;   
    }
    console.log(newState);
    return newState;
}

export default reducer;
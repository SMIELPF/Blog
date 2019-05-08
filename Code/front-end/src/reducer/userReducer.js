const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const UPDATE_UNREAD_NUM = 'UPDATE_UNREAD_NUM';
const INITIAL_UNREAD_NUM = 'INITIAL_UNREAD_NUM';

function UserReducer(state,action){
    if(!state){
        return{
            hasLoggedIn:false,
            nickname:'',
            uid:0,
            role:'VISITOR',
            unread_num:0
        }
    }

    let newState;
    switch(action.type){
        case LOG_IN:
            newState = {
                ...state,
                hasLoggedIn:true,
                ...action.info
            };
            break;
        case LOG_OUT:
            newState = {
                ...state,
                hasLoggedIn:false
            };
            break;
        case INITIAL_UNREAD_NUM:
            newState = {
                ...state,
                unread_num:action.unread_num
            };
            break;
        case UPDATE_UNREAD_NUM:
            newState = {
                ...state,
                unread_num:state.unread_num - 1
            };
            break;
        default:
            return state;   
    }
    return newState;
}

export default UserReducer;
export const FIND_PW_REQUESTING = 'FIND_PW_REQUESTING';
export const FIND_PW_RESULT = 'FIND_PW_RESULT';
export const FIND_PW_CLEAR = 'FIND_PW_CLEAR'
export const findPWRequest = (request) => ({ type: FIND_PW_REQUESTING,  payload: request }); // id, email
export const findPWResult = (response) => ({ type: FIND_PW_RESULT,  payload:response});

export const findPWClear = () =>({type:FIND_PW_CLEAR})

const initialState = {

    findPWResult: 0,
}

export default function handleClient(state = initialState, action) {
    switch (action.type) {

        case FIND_PW_REQUESTING:
            return {
                ...state,
                findPWResult: 0
            };
        case FIND_PW_RESULT:
            return {
                ...state,
                findPWResult: action.payload.result,
            };
        case FIND_PW_CLEAR:
            return{
                ...state,
                findPWResult: 0
            }
       
        default:
            return state;
    }
}
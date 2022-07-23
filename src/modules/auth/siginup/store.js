export const SIGNUP_REQUESTING = 'SIGNUP_REQUESTING';
export const SIGNUP_RESULT = 'SIGNUP_RESULT';
export const SIGNUP_RESET = 'SIGNUP_RESET';
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

export const signupRequest = (request) => ({ type: SIGNUP_REQUESTING,  payload: request });
export const signupResult = (response) => ({ type: SIGNUP_RESULT,  payload:response});
export const signupReset = () => ({ type: SIGNUP_RESET});
export const signupError =() =>({type:SIGNUP_ERROR,payload:errorLog})
const initialState = {
    errorLog: null,
    signupResult: 0,
}

export default function handleClient(state = initialState, action) {
    switch (action.type) {
     
        case SIGNUP_REQUESTING:
            return {
                ...state,
                signupResult: 0,
                errorLog: null,
            };
        case SIGNUP_RESULT:
            return {
                ...state,
                signupResult: action.payload.result,
                errorLog: null,
            };
        case SIGNUP_RESET:
            return {
                ...state,
                signupResult: 0,
                errorLog: null,
            };
        case SIGNUP_ERROR:
            let errorLogText;
            if (action.error){
                console.log(action)
                errorLogText = action.error.data.message.toString()
            }else {
                errorLogText = "네트워크 상태를 확인해주세요."
            }
            return {
                ...state,
                signupResult: 0,
                errorLog: errorLogText,
            }
       
        default:
            return state;
    }
}
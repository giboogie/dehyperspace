export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_EXISTING = 'LOGIN_EXISTING';
export const LOGOUT = 'LOGOUT';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';


export const loginRequest = (objectForLogin) => ({ type: LOGIN_REQUESTING,  payload: objectForLogin });
export const loginSuccess = (response) => ({ type: LOGIN_SUCCESS,  payload:response});
export const loginClear = () => ({ type: LOGIN_CLEAR });
export const loginError = () => ({ type: LOGIN_ERROR,  errorLog });

export const logout = () => ({type: LOGOUT});


const initialState = {
    result: 0,
    requesting: false,
    errors: null,
    jwt: null,
    isLoadingVisible: false,
    id: null,
    name: null,
    addr: null,
    foundation: null,
    events: false,
    //id: null,
}
export default function handleClient(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            return {
                ...state,
                result: 0,
                requesting: true,
                errors: null,
                jwt: null,
                isLoadingVisible: true,
                id: null,
                name: null,
                addr: null,
                foundation: null,
                events: false,
               //id: null,
           
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                errors: null,
                jwt: action.payload.token,
                result : action.payload.result,
                isLoadingVisible: false,
                id: action.payload.id,
                name: action.payload.name,
                addr: action.payload.addr,
                foundation: action.payload.foundation,
                events: action.payload.events,
                //id: action.payload.id,
               
            };
        case LOGIN_ERROR:
            let errorLogText;
            if (action.error){
                errorLogText = action.error.data.message.toString()
            }else {
                errorLogText = "네트워크 상태를 확인해주세요."
            }
            return {
                ...state,
                requesting: false,
                // errors: action.error.data.message.toString(),
                errors: errorLogText,
                result : 2,
                jwt: null,
                isLoadingVisible: false,
                id: null,
                name: null,
                addr: null,
                foundation: null,
                events: false,
                //id: null,
               
            };
        case LOGIN_CLEAR:
            return {
                ...state,
                result: 0,
                requesting: false,
                errors: null,
                jwt: null,
                isLoadingVisible: false,
                id: null,
                name: null,
                addr: null,
                foundation: null,
                events: false,
                //id: null,
               
            };
        case LOGOUT:
            return {
                ...state,
                result: 0,
                requesting: false,
                errors: null,
                jwt: null,
                isLoadingVisible: false,
                id: null,
                name: null,
                addr: null,
                foundation: null,
                events: false,
                
            };
        default:
            return state;
    }
}
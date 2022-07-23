export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; 
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_EXISTING = 'LOGIN_EXISTING';
export const LOGOUT = 'LOGOUT';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';


export const loginRequest = (objectForLogin) => ({type: LOGIN_REQUESTING, payload: objectForLogin});
export const loginClear = ()=>({type: LOGIN_CLEAR});
export const loginError = ()=>({type: LOGIN_ERROR, payload: errorLog});

// 초기 상태 정의 
const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: '',
    isEmailAuth: false,
};


export default function handleLogin(state=initialState, action){
    switch(action.type){
        case LOGIN_REQUESTING :
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Logging in...', time: new Date() }],
                errors: '',
                isEmailAuth: false,
            };
            

        case LOGIN_SUCCESS :
            return {
                errors: '',
                messages: [],
                requesting: false,
                successful: true,
                // isEmailAuth: action.isEmailAuth,
                isEmailAuth: false,
            };
        case LOGIN_CLEAR :
                return {
                    requesting: false,
                    successful: false,
                    messages: [],
                    errors: '',
                    isEmailAuth: false,
                };
        case LOGIN_ERROR :
            return {
                errors: {
                    // body: action.error.response.status.toString(),
                    body: action.error.toString(),
                    time: new Date(),
                  },
                messages: [],
                requesting: false,
                successful: false,
                isEmailAuth: true,
            };
        default :
            return state;
    }
}


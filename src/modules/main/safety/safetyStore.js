export const SAFETYDATA_REQUESTING = 'SAFETYDATA_REQUESTING';
export const SAFETYDATA_SUCCESS = 'SAFETYDATA_SUCCESS';
export const SAFETYDATA_ERROR = 'SAFETYDATA_ERROR'
export const safetyDataRequest = (request) => ({type: SAFETYDATA_REQUESTING, payload: request}); 
export const safetyDataSuccess = (response) => ({type: SAFETYDATA_SUCCESS, payload: response}); 
export const safetyDataError = (error) => ({type:SAFETYDATA_ERROR, payload: error});


const initialState = {
    isLoadingVisible: true,
    data: [],
    error: false,
    errorLog: null,


};                                                                                                                                                                   

export default function handleMain(state=initialState, action){
    switch(action.type){
        case SAFETYDATA_REQUESTING :
            return {
               ...state,
               error: false,
               data:[],
            };
            
        case SAFETYDATA_SUCCESS :
            return {
                ...state,
                isLoadingVisible: false,
                error: false,
                errorLog: null,
                data: action.payload,

            };
            case SAFETYDATA_ERROR:
                return {
                    ...state,
                    isLoadingVisible: false,
                    error: true,
                    errorLog: action.payload
    
                };
        
        default :
            return state;
    }
}

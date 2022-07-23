export const FRIGEDATA_REQUESTING = 'FRIGEDATA_REQUESTING';
export const FRIGEDATA_SUCCESS = 'FRIGEDATA_SUCCESS';
export const FRIGEDATA_ERROR = 'FRIGEDATA_ERROR'
export const frigeDataRequest = (request) => ({type: FRIGEDATA_REQUESTING, payload: request}); 
export const frigeDataSuccess = (response) => ({type: FRIGEDATA_SUCCESS, payload: response}); 
export const frigeDataError = (error) => ({type:FRIGEDATA_ERROR, payload: error});


const initialState = {
    table : null,
    isLoadingVisible: true,
    data: [],
    error: false,
    errorLog: null,
    quantity: null,
    color: null,
    test: null,
    totalLength: null,
};                                                                                                                                                                   

export default function handleMain(state=initialState, action){
    switch(action.type){
        case FRIGEDATA_REQUESTING :
            return {
               ...state,
               error: false,
               data:[],
               totalLength: null,
            };
            
        case FRIGEDATA_SUCCESS :
            return {
                ...state,
                isLoadingVisible: false,
                error: false,
                errorLog: null,
                data: action.payload.data,
                totalLength: action.payload.totalLength,

            };
            case FRIGEDATA_ERROR:
                return {
                    ...state,
                    isLoadingVisible: false,
                    error: true,
                    errorLog: action.payload,
                    totalLength: null,
    
                };
        
        default :
            return state;
    }
}

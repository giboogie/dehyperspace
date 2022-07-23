export const MAINDATA_REQUESTING = 'MAINDATA_REQUESTING';
export const MAINDATA_SUCCESS = 'MAINDATA_SUCCESS';
export const MAINDATA_ERROR = 'MAINDATA_ERROR'
export const mainDataRequest = (request) => ({ type: MAINDATA_REQUESTING, payload: request });
export const mainDataSuccess = (response) => ({ type: MAINDATA_SUCCESS, payload: response });

export const mainDataError = (error) => ({ type: MAINDATA_ERROR, payload: error });


const initialState = {
    error: false,
    errorLog: null,
    pollution: 1,
    isLoadingVisible: false,
};

export default function handleMain(state = initialState, action) {
    switch (action.type) {
        case MAINDATA_REQUESTING:
            return {
                ...state,
                isLoadingVisible: true,
                pollution: 1,
                error:false,
                errorLog:null,
            };

        case MAINDATA_SUCCESS:
            return {
                ...state,
                error: false,
                errorLog: null,
                pollution: action.payload.pollution,
                isLoadingVisible: false,
            };
        case MAINDATA_ERROR:
            return {
                ...state,
                error:true,
                errorLog: action.payload,
                // pollution: action.payload.response.data.pollution,
                pollution: 1,
                isLoadingVisible: false,
            };


        default:
            return state;
    }
}

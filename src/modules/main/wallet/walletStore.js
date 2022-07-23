export const WALLETDATA_REQUESTING = 'WALLETDATA_REQUESTING';
export const WALLETDATA_SUCCESS = 'WALLETDATA_SUCCESS';

export const walletDataRequest = (request) => ({type: WALLETDATA_REQUESTING, payload: request}); 
export const walletDataSuccess = (response) => ({type: WALLETDATA_SUCCESS, payload: response}); 



const initialState = {
    addr : null,
    quantity : null,
    data : null,
    isLoadingVisible: true,

};                                                                                                                                                                   

export default function handleMain(state=initialState, action){
    switch(action.type){
        case WALLETDATA_REQUESTING :
            return {
               ...state,
               isLoadingVisible: true,
            };
            
        case WALLETDATA_SUCCESS :
            return {
                ...state,
                isLoadingVisible: false,
                addr: action.payload.data.addr,
                quantity: action.payload.data.quantity,
                data: action.payload.data

            };

        
        default :
            return state;
    }
}

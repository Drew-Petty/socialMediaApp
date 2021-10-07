import { ADD_PICTURE, GET_PICTURES, PICTURE_ERROR } from "../actions/types";

const initialState={
    pictures:[],
    picture:null,
    loading:true,
    error:{}
}
const reducePicture = (state = initialState, action)=>{
    const {type, payload}= action
    switch(type){
        case ADD_PICTURE:
            console.log('reducePicture')
            return{
                ...state,
                pictures:[...state.pictures,payload],
                loading:false
            }
        case PICTURE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case GET_PICTURES:
            return{
                ...state,
                pictures: payload,
                loading: false
            }
        default:
            return state
    }
}
export default reducePicture
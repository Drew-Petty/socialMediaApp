import axios from 'axios'
import { setAlert } from './alert'
import { PICTURE_ERROR, ADD_PICTURE, GET_PICTURES } from './types'

export const addPicture = file => async dispatch =>{
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    const formData = new FormData()
    formData.append('file', file)
    try {
        const res = await axios.post('/api/pictures/', formData, config)
        dispatch({
                type:ADD_PICTURE,
                payload:res.data
                })
            
        dispatch(setAlert('Picture Added', 'success'))
    } catch (err) {
        console.log(err)
        dispatch({
            type: PICTURE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getPictures = () => async dispatch =>{
    try {
        const res = await axios.get('/api/pictures')
        dispatch({
            type: GET_PICTURES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PICTURE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
import axios from 'axios'
import Axios from 'axios'

export const onUserRegister = (email, password) => {
    return(dispatch) => {
        dispatch(
            {
                type: 'LOADING'
            }
        )

        Axios.post(`http://localhost:4000/authentic-system/register`, {email: email, password: password})
        .then((res) => {
            dispatch(
                {
                    type: 'AUTH_SUCCESS',
                    payload: res.data.message
                }
            )
        })
        .catch((err) => {
            dispatch(
                {
                    type: 'AUTH_ERROR',
                    payload: err.message
                }
            )
        })

    }
}

export const onUserLogin = (data) => { 
    return (dispatch) => {
        dispatch({
            type: 'LOADING'
        })

        axios.post(`http://localhost:4000/authentic-system/login`, data)
        .then((res) => {
            console.log(res)
            if(res.data.error === false){
                localStorage.setItem('my-tkn', res.data.data.token)
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data.data.token
                })
            }else if(res.data.error === true){
                dispatch({
                    type: 'LOGIN_ERROR',
                    payload: res.data.message
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: 'LOGIN_ERROR',
                payload: err.response.data.message
            })
        })
    }
}

export const checkUserVerify = (token) => {
    return (dispatch) => {
        axios.post(`http://localhost:4000/authentic-system/user-verify`, {token})
        .then((res) => {
            console.log(res.data.is_email_confirmed)
            dispatch({
                type: 'CHECK_USER_VERIFY_SUCCESS',
                payload: res.data.is_email_confirmed
            })
        })
        .catch((err) => {
            dispatch({
                type: 'CHECK_USER_VERIFY_ERROR',
                payload: err.response.data.message
            })
        })
    }
}


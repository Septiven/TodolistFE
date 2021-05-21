import Axios from 'axios';

export const onCreateTodo = (dataToSend) => {
    return (dispatch) => {

        let data = {
            token: dataToSend.token 
        }

        Axios.post('http://localhost:4000/todo/create', dataToSend)
        .then((res) => {
            Axios.post('http://localhost:4000/todo/get', data)
            .then((response) => {
                console.log(response)
                dispatch({
                    type: 'TODO_SUCCESS',
                    payload: response.data.data
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: 'TODO_ERROR',
                    payload: error.response.data.message
                })
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: 'TODO_ERROR',
                payload: err.response.data.message
            })
        })

    }
}

export const onGetTodo = (data) => {
    return(dispatch) => {

        Axios.post('http://localhost:4000/todo/get', data)
            .then((response) => {
                console.log(response)
                dispatch({
                    type: 'TODO_SUCCESS',
                    payload: response.data.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: 'TODO_ERROR',
                    payload: error.response.data.message
                })
            })

    }
}

export const deleteData = (id) => {
    return (dispatch) => {
        Axios.post('http://localhost:4000/todo/delete',{id})

        .then ((res) => {
            if (res.data.error === false){
                dispatch ({
                    type: "TODO_DELETE_SUCCESS",
                    payload: res.data.message
                })

            } else if (res.data.error === true){
                dispatch ({
                    type: "TODO_DELETE_FAIL",
                    payload: res.data.message
                })
            }
        })

        .catch ((err) => {
            console.log (err)
            dispatch ({
                type: "TODO_DELETE_FAIL",
                payload: err.response.data.message
            })
        })
    }
}

export const updateData =(dataToSend) =>{
    return(dispatch) => {

        let data = {
            token: dataToSend.token 
        }

        Axios.post('http://localhost:4000/todo/update', dataToSend)
        .then((res) => {
            Axios.post('http://localhost:4000/todo/get', data)
            .then((response) => {
                console.log(response)
                dispatch({
                    type: 'TODO_SUCCESS',
                    payload: response.data.data
                })
            })
            .catch((error) => {
                console.log(error)
                dispatch({
                    type: 'TODO_ERROR',
                    payload: error.response.data.message
                })
            })
        })
        .catch((err) => {
            console.log(err.response)
            dispatch({
                type: 'TODO_ERROR',
                payload: err.response.data.message
            })
        })

    }
}
import axios from "axios";

const apiUrl = 'https://62d056161cc14f8c0888ee41.mockapi.io/todos'

export const getAllTodos = () => {
    return (dispatch) => {
        return axios.get(`${apiUrl}`)
            .then((res => {
                dispatch ({
                    type: 'GAT_ALL_TODOS',
                    payload: res.data
                })
            }))
    }
}

export const addNewTodo = (text) => {
    return (dispatch, getState) => {
        return axios.post(`${apiUrl}`,{text})
            .then(res => {
                dispatch ({
                    type: 'ADD_TODO',
                    payload: [...getState().todos, {
                        id: res.data.id,
                        text: res.data.text,
                        completed: false,
                    }]
                })
            })
    }
}

export const deleteTodo = (id) => {
    return (dispatch, getState) => {
        axios.delete(`${apiUrl}/${id}`)
            .then(res => {
                dispatch({
                    type: 'DELETE_TODO',
                    payload: getState().todos.filter(item => item.id !== id)
                })
            })
    };
};

export const isDone = (id) => {
    return (dispatch, getState) => {
        return axios.put(`${apiUrl}/${id}`)
            .then(res => {
                console.log(res.data)
                dispatch ({
                    type: 'COMPLETE_ITEM',
                    payload: getState().todos.map((item) => {
                        if (item.id !== id) {
                            return item
                        }
                        return {...item, completed: !item.completed}
                    })
            })
       })
   };
}

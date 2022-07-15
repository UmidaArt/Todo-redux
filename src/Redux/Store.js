import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";

const initialState = {
    todos: []
}

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GAT_ALL_TODOS':
            return {...state, todos: action.payload}
        case 'ADD_TODO':
            return {...state, todos: action.payload}
        case 'DELETE_TODO':
            return {...state, todos: action.payload}
        case 'COMPLETE_ITEM':
            return {...state, todos: action.payload}
        default:
            return state
    }
}

export const store = createStore(storeReducer, composeWithDevTools(
    applyMiddleware(thunk)
))
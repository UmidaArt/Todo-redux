import './App.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNewTodo, deleteTodo, getAllTodos, isDone} from "./Redux/Actions";

function App() {

    const [todo, setTodo] = useState('')

    const dispatch = useDispatch()
    const {todos} = useSelector((store) => store)

    useEffect(() => {
        dispatch(getAllTodos())
    }, [dispatch])

    const handleClick = () => {
        if (todo.trim().length) {
            dispatch(addNewTodo(todo))
        }
        setTodo('')
    }

    const handleChange = (e) => {
        setTodo(e.target.value)
    }
    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
    }

    const handleDone = (id) => {
        dispatch(isDone(id))
    }

    return (
    <div className="container">
        <div className='row'>
            <div className="col-6 offset-3">
                <h1 className="title">To Do List</h1>
                <div className="input-group mb-5">
                    <input type="text"
                           onChange={handleChange}
                           value={todo}
                           className="form-control"
                           placeholder="Edd todo"
                           aria-label="todo"
                           aria-describedby="button-addon2"/>
                    <button type="button" className="btn btn-outline-danger" onClick={handleClick}>Add todo</button>
                </div>
                <div>
                    {
                        todos.map((item) =>
                            <div className="input-group mb-3" key={item.id}>
                                <div className="form-control">
                                    <input type="checkbox"
                                           className="form-check-input mr-3"
                                           id="exampleCheck1"
                                           onChange={() => handleDone(item.id)}
                                    />
                                    <span className="text">{item.text}</span>
                                </div>
                                <button className="btn btn-outline-secondary" onClick={() => handleDelete(item.id)} type="button">Delete</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;

import React, {useRef, useState, useCallback} from 'react';

function TodoList({todos, updateTodo, deleteTodo}) {
    return (
        <ul style = {{listStyle: "none"}}>
        {todos.map( item => (
            <li style={{ padding: "1.5rem"}}
                key={item.id}>

                   
                <input 
                    type="checkbox"
                    checked={item.done}
                    onChange={() => updateTodo(item.id)} /> 
                
                <div style={
                    item.done
                        ? {
                            color: "",
                            borderBottom: "3px solid seagreen",

                            display: "inline-table",
                            padding: "1rem",
                            width: "250px",
                            color: "seagreen", 
                            textDecorationLine: "line-through"}
                        : { 
                            
                            borderBottom: "3px solid slategray",
                            display: "inline-table", 
                            padding: "1rem", 
                            width: "250px"}
                
                }> {item.text} </div> 
                <button style={{margin: "10px"}}
                    onClick={ () => deleteTodo(item.id)}> 삭제</button>
            </li>
        ))
        }
        </ul>
    )
}

function TodoHeader({todos}) {
    return (        
        <center>
            <h3>202112707 Todo App ( {todos.filter( item => item.done ).length } / {todos.length})</h3>        
        </center>
    )
}

function NewTodoForm({addTodo}) {
    let [todo, setTodo] = useState('');
    const ref = useRef();

    const onChange = useCallback(e => {
        setTodo(e.target.value)
    });

    const onAddButtonClicked = useCallback(e => {
        e.preventDefault();
        addTodo(todo);
        setTodo('');
        ref.current.focus();
    }, [addTodo, todo]);
    return (
        <div>
            <form onSubmit={onAddButtonClicked}>
                <div>
                    <input 
                        placeholder = '할일을 입력하세요.'
                        onChange = {onChange}
                        value = {todo}
                        ref = {ref} />
                </div>
                <input type = 'submit' value = '추가' />
            </form>
        </div>
    )
}

function App() {    
    let [todos, setTodos] = useState([
            {id: 1, text: 'study react.js', done: false},
            {id: 2, text: 'study ReactNative', done: false},
            {id: 3, text: 'study node.js', done: true}
    ]);
    
    const id_autoIncrement = useRef(todos.length);
    console.log('todos id:', id_autoIncrement);

    const handleTodoAdd = useCallback(contents => {
        id_autoIncrement.current += 1;
        const todoDTO = {
            id: id_autoIncrement.current,
            text: contents,
            done: false
        };
        setTodos(todos => todos.concat(todoDTO));
        
    }, []);

    const deleteTodo = useCallback(id => {
        setTodos(todos.filter(todo => todo.id !== id));
    }, [todos]);

    const deleteTodos = useCallback({

    }, [todos]);
    const deleteTodosComplete = useCallback({

    }, [todos]);
    const updateTodo = useCallback(id => {
        console.log('updateTodo: id: ',id)
        setTodos(todos.map(todo => todo.id !== id ? todo: { ...todo, done: !todo.done}))
    }, [todos]);

    return (
        <center>
            <div>
                <TodoHeader todos={todos} />
                <TodoList todos={todos} deleteTodo = {deleteTodo} updateTodo={updateTodo}/>
                <NewTodoForm addTodo={handleTodoAdd}/>
            </div>
        </center>
        
    );
}

export default App;
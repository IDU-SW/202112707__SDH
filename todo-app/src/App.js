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

function TodoHeader({todos, deleteTodosComplete, deleteTodos, updateTodos}) {
    return (        
        <center>
            <h3>202112707 Todo App ( {todos.filter( item => item.done ).length } / {todos.length})</h3>        
            <button
                style={{margin: "10px"}}
                onClick={ () => updateTodos()}
            > {todos.length/2 < todos.filter(todo => todo.done).length ? "전체 해제" : "전체 완료"}</button>
            <button
                style={{margin: "10px"}}
                onClick={ () => deleteTodosComplete()}
            > 완료 삭제</button>
            <button 
                style={{margin: "10px"}}
                onClick={ () => deleteTodos()}
            > 전체 삭제</button>
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
                        style={
                            {
                                width: "270px",
                                margin: "30px"
                            }
                        } 
                        placeholder = '할일을 입력하세요.'
                        onChange = {onChange}
                        value = {todo}
                        ref = {ref} />
                
                    <input type = 'submit' value = '추가' />
                </div>
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

    const addTodo = useCallback(contents => {
        console.log('addTodo: contents:',contents)
        id_autoIncrement.current += 1;
        const todoDTO = {
            id: id_autoIncrement.current,
            text: contents,
            done: false
        };
        setTodos(todos => todos.concat(todoDTO));
    }, []);

    const deleteTodo = useCallback(id => {
        console.log('deleteTodo: id: ',id)
        setTodos(todos.filter(todo => todo.id !== id));
    }, [todos]);

    const deleteTodos = useCallback(_ => {
        console.log("deleteTodos");
        setTodos([]);
    }, [todos]);

    const deleteTodosComplete = useCallback( _ => {
        console.log("deleteTodosComplete");
        setTodos(todos.filter(todo => !todo.done));
    }, [todos]);

    const updateTodo = useCallback(id => {
        console.log('updateTodo: id: ',id)
        setTodos(todos.map(todo => todo.id !== id ? todo: { ...todo, done: !todo.done}))
    }, [todos]);

    const updateTodos = useCallback(_ => {
        console.log('updateTodos: ')
        const flag = todos.length/2 < todos.filter(todo => todo.done).length

        setTodos(todos.map(todo => flag ? {...todo, done: false}: {...todo, done: true}))
    }, [todos]);
    return (
        <center>
            <div>
                <TodoHeader 
                    todos={todos}
                    deleteTodos={deleteTodos}
                    deleteTodosComplete={deleteTodosComplete}
                    updateTodos={updateTodos}/>
                <TodoList 
                    todos={todos} 
                    deleteTodo = {deleteTodo} 
                    updateTodo={updateTodo}/>
                <NewTodoForm addTodo={addTodo}/>
            </div>
        </center>
        
    );
}

export default App;
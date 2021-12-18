import React, {useRef, useState, useCallback} from 'react';

function TodoList({todos, complete}) {
    return (
        <ul style = {{listStyle: "none"}}>
        {todos.map( item => (
            <li key={item.id}>

                   
                <input type="checkbox" checked={item.done} onChange={() => complete(item.id)} /> 
                <div style={
                    item.done
                        ? {display: "inline-block", padding: "1rem", width: "250px", color: "lightsteelblue", textDecorationLine: "line-through"}
                        : {display: "inline-block", padding: "1rem", width: "250px"}
                
                }> {item.text} </div> 
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
    console.log('todos count:', todos.count);
    const count = useRef(4);

    const handleTodoAdd = useCallback(contents => {
        const todoDTO = {
            id: count.current,
            text: contents,
            done: false
        };

        setTodos(todos => todos.concat(todoDTO));
        count.current += 1;
    }, []);

    const complete = useCallback(id => {
        setTodos(todos.map(todo => todo.id !== id ? todo: { ...todo, done: !todo.done}))
    }, [todos]);

    return (
        <center>
            <div>
                <TodoHeader todos={todos} />
                <TodoList todos={todos} complete={complete}/>
                <NewTodoForm addTodo={handleTodoAdd}/>
            </div>
        </center>
        
    );
}

export default App;
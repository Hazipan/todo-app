import React, { useState } from 'react';
import Input from './components/Input';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  type Todo = {
    completed: boolean,
    text: string,
  };
  // state variables
  // theme for establishing light mode and dark mode
  const [theme, setTheme] = useState('dark');
  // value for todo item input
  const [value, setValue] = useState('');
  // todos list
  const [todos, setTodos] = useState<Todo[]>([]);
  // list of completed todos
  const [compTodos, setCompTodos] = useState<Todo[]>([]);


  // images for mode switch
  const sunIcon = './images/icon-sun.svg';
  const moonIcon = './images/icon-moon.svg';
  let icon: string;
  if (theme === 'light') { icon = moonIcon }
  else { icon = sunIcon };

  // change color theme when the icon is clicked
  const iconClick = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  const handleKeyPress = (e: any) => {
    // Only act if the key pressed what the enter key
    if (e.which === 13) {
      setTodos(todos.concat({ completed: false, text: value }));
      // reset value
      setValue('');
    }
  }

  const handleChange = (e: any) => {
    setValue(e.target.value);
  }

  const todoClick = (e: any) => {
    // store index number from target's tabIndex
    // I used tabIndex to store each todo's key value / index number
    const index = e.target.tabIndex;
    // spread todo array accross a new temp array for manipulation
    const arr = [...todos];
    // flip the completed status of the element at the index recieved from the event
    arr[index].completed = !arr[index].completed;
    // update todo array to match the temp array
    setTodos(arr);
    // set completed todo array to be all completed items from the temp array
    setCompTodos(arr.filter(item => item.completed));
  }

  const removeClick = (e: any) => {
    const index = e.target.tabIndex;
    const itemToRemove = todos[index];
    setTodos(todos.filter(item => item !== itemToRemove));
    setCompTodos(compTodos.filter(item => item !== itemToRemove));
  }

  const clearCompleted = () => {
    const temp = [...compTodos];
    let tempTodo = [...todos];
    let tempComp = [...compTodos];
    for(let i = 0; i < temp.length; i++) {
      let itemToRemove = temp[i];
      tempTodo.splice(tempTodo.indexOf(itemToRemove), 1);
      tempComp.splice(tempComp.indexOf(itemToRemove), 1);
    }
    setTodos(tempTodo);
    setCompTodos(tempComp);
  }

  return (
    <div className='app' data-theme={theme}>
      <main>
        <header>
          <h1 className='title'>TODO</h1>
          <img src={icon} alt='color theme switch' onClick={iconClick} className='icon' />
        </header>
        <Input onKeyPress={handleKeyPress} value={value} onChange={handleChange} />
        <div className='todoContainer'>
          {todos.map((el, i) => {
            return (
              <Todo
                key={i}
                index={i}
                text={el.text}
                completed={el.completed}
                todoClick={todoClick}
                removeClick = {removeClick}
              />
            )
          })}
          <div className='todoFooter'>
            <p>{todos.length - compTodos.length} items left</p>
            <button className='clearButton' onClick={clearCompleted}>Clear Completed</button>
          </div>
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App;

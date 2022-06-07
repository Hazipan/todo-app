import React, { useState } from 'react';
import Input from './components/Input';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  type Todo = {
    completed: boolean,
    text: string
  };
  // state variables
  // theme state for establishing light mode and dark mode
  const [theme, setTheme] = useState('dark');
  // value state for todo item input
  const [value, setValue] = useState('');
  // todos state for array of todo items
  const [todos, setTodos] = useState<Todo[]>([]);

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
    console.log('todo clicked!');
  }

  const removeClick = (e: any) => {
    const index = e.target.alt;
    const itemToRemove = todos[index];
    setTodos(todos.filter(item => item !== itemToRemove))
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
            <p>{todos.length} items left</p>
            <button className='clearButton'>Clear Completed</button>
          </div>
        </div>
      </main>
      <footer>

      </footer>
    </div>
  )
}

export default App;

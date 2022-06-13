import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import Input from './components/Input';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  type Todo = {
    completed: boolean,
    text: string,
  };

  enum Filter {
    All = 'ALL',
    Active = 'ACTIVE',
    Complete = 'COMPLETE'
  }

  // state variables
  // theme for establishing light mode and dark mode
  const [theme, setTheme] = useState('dark');
  // value for todo item input
  const [value, setValue] = useState('');
  // todos list
  const [todos, setTodos] = useState<Todo[]>([]);
  // list of completed todos
  const [compTodos, setCompTodos] = useState<Todo[]>([]);
  // list of active todos for filtering purposes
  const [activeTodos, setActiveTodods] = useState<Todo[]>([]);
  // filter state to determine what todo list is displayed
  const [filter, setFilter] = useState<Filter>(Filter.All);


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
      setActiveTodods(activeTodos.concat({ completed: false, text: value }));
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
    setActiveTodods(arr.filter(item => !item.completed));
  }

  const removeClick = (e: any) => {
    const index = e.target.tabIndex;
    const itemToRemove = todos[index];
    setTodos(todos.filter(item => item !== itemToRemove));
    setCompTodos(compTodos.filter(item => item !== itemToRemove));
    setActiveTodods(activeTodos.filter(item => item !== itemToRemove));
  }

  const clearCompleted = () => {
    const temp = [...compTodos];
    let tempTodo = [...todos];
    let tempComp = [...compTodos];
    for (let i = 0; i < temp.length; i++) {
      let itemToRemove = temp[i];
      tempTodo.splice(tempTodo.indexOf(itemToRemove), 1);
      tempComp.splice(tempComp.indexOf(itemToRemove), 1);
    }
    setTodos(tempTodo);
    setActiveTodods(tempTodo);
    setCompTodos(tempComp);
  }

  const changeFilter = (e: any) => {
    const filterButtons = [
      document.getElementById('all'),
      document.getElementById('active'),
      document.getElementById('complete')
    ]
    const filter = e.target.value;
    setFilter(filter);

    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i]?.classList.remove('active');
    }
    document.getElementById(e.target.id)?.classList.add('active');
  }

  const onDragEnd = (result) => {
    // redorder the components
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (filter === Filter.All) {
      const temp = [...todos];
      const itemToMove = todos[source.index];
      temp.splice(source.index, 1);
      temp.splice(destination.index, 0, itemToMove);

      setTodos(temp);
    } else if (filter === Filter.Active) {
      const temp = [...activeTodos];
      const itemToMove = activeTodos[source.index];
      temp.splice(source.index, 1);
      temp.splice(destination.index, 0, itemToMove);

      setActiveTodods(temp);
    } else if (filter === Filter.Complete) {
      const temp = [...compTodos];
      const itemToMove = compTodos[source.index];
      temp.splice(source.index, 1);
      temp.splice(destination.index, 0, itemToMove);

      setCompTodos(temp);
    }
  }

  let displayList = todos;

  switch (filter) {
    case Filter.All:
      displayList = todos;
      break;
    case Filter.Active:
      displayList = activeTodos;
      break;
    default:
      displayList = compTodos;
  }

  return (
    <div className='app' data-theme={theme}>
      <main>
        <header>
          <h1 className='title'>TODO</h1>
          <img src={icon} alt='color theme switch' onClick={iconClick} className='icon' />
        </header>
        <Input onKeyPress={handleKeyPress} value={value} onChange={handleChange} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='taskList'>
            {(provided) => (
              <div className='todoContainer' {...provided.droppableProps} ref={provided.innerRef}>
                {displayList.map((el, i) => {
                  return (
                    <Todo
                      key={i}
                      index={i}
                      text={el.text}
                      completed={el.completed}
                      todoClick={todoClick}
                      removeClick={removeClick}
                    />
                  )
                })}
                {provided.placeholder}
                <div className='todoFooter'>
                  <p>{todos.length - compTodos.length} items left</p>
                  <button type='button' className='clearButton' onClick={clearCompleted}>Clear Completed</button>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className='filterContainer'>
          <button type='button' className='active' id='all' value={Filter.All} onClick={changeFilter}>All</button>
          <button type='button' id='active' value={Filter.Active} onClick={changeFilter}>Active</button>
          <button type='button' id='complete' value={Filter.Complete} onClick={changeFilter}>Complete</button>
        </div>
        <p className='instructions'>Drag and drop to reorder the list</p>
      </main>
      <footer>
        <p>Coded by <a href='https://github.com/Hazipan/'>Aaron Rutherford</a>. Challenge by <a href='https://www.frontendmentor.io/'>Frontend Mentor</a></p>
        <a href='https://github.com/Hazipan/todo-app/'>See the code!</a>
      </footer>
    </div>
  )
}

export default App;

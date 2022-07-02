import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import Input from './components/Input';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  type Todo = {
    completed: boolean,
    text: string,
    visible: boolean
  };

  enum Filter {
    All = 'ALL',
    Active = 'ACTIVE',
    Complete = 'COMPLETE'
  }

  // state variables
  const [theme, setTheme] = useState(
    (): string => { return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' }
  );
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    return localStorage.getItem('todos') === null ? [] : JSON.parse(localStorage.getItem('todos'));
  });


  // Persist state using local storage
  useEffect(() => { localStorage.setItem('theme', theme); });
  useEffect(() => { localStorage.setItem('todos', JSON.stringify(todos)) });

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
    // Only act if the key pressed was the enter key
    if (e.which === 13) {
      setTodos(todos.concat({ completed: false, text: value, visible: true }));
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
    // remove the completed element and put it at the end of the list
    if (arr[index].completed) {
      const completedItem = arr[index];
      let newArr = arr.filter(item => item !== completedItem);
      newArr.push(completedItem);
      setTodos(newArr)
    } else {
      setTodos(arr);
    }
    // update todo array to match the temp array
    //setTodos(arr);
    // set completed todo array to be all completed items from the temp array

  }

  const removeClick = (e: any) => {
    const index = e.target.tabIndex;
    setTodos(todos.filter(item => item !== todos[index]));
  }

  const clearCompleted = () => {
    console.log('clearing completed tasks');
    setTodos(todos.filter(item => !item.completed));
  }

  const changeFilter = (e: any) => {
    const filterButtons = [
      document.getElementById('all'),
      document.getElementById('active'),
      document.getElementById('complete')
    ]
    const filter = e.target.value;
    let temp = [...todos];

    switch (filter) {
      case Filter.All:
        console.log('showing all tasks')
        for (let i = 0; i < temp.length; i++) {
          temp[i].visible = true;
        }
        break;
      case Filter.Active:
        console.log('hiding completed tasks')
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].completed) {
            temp[i].visible = false;
          } else {
            temp[i].visible = true;
          }
          console.log(`${temp[i].text} set to ${temp[i].visible}`);
        }
        break;
      case Filter.Complete:
        console.log('hiding active tasks')
        for (let i = 0; i < temp.length; i++) {

          if (!temp[i].completed) {
            temp[i].visible = false;
          } else {
            temp[i].visible = true;
          }
          console.log(`${temp[i].text} set to ${temp[i].visible}`);
        }
        break;
      default:
    }

    for (let i = 0; i < filterButtons.length; i++) {
      filterButtons[i]?.classList.remove('active');
    }
    document.getElementById(e.target.id)?.classList.add('active');

    setTodos(temp);
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

    const temp = [...todos];
    const itemToMove = todos[source.index];
    temp.splice(source.index, 1);
    temp.splice(destination.index, 0, itemToMove);

    setTodos(temp);
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
                {todos.map((el, i) => {
                  return (
                    <Todo
                      key={i}
                      index={i}
                      text={el.text}
                      completed={el.completed}
                      todoClick={todoClick}
                      removeClick={removeClick}
                      visible={el.visible}
                    />
                  )
                })}
                {provided.placeholder}
                <div className='todoFooter'>
                  <p>{todos.length} items left</p>
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

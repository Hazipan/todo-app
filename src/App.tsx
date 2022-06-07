import React, { useState } from 'react';
import Input from './components/Input';
import './App.css';

const App = () => {
  type Todo = {
    completed: boolean,
    value: string
  };
  // state variables
  // mode for establish light mode or dark mode
  let [theme, setTheme] = useState('dark')

  // images for mode switch
  const sunIcon = './images/icon-sun.svg';
  const moonIcon = './images/icon-moon.svg';
  let icon: string;
  if(theme === 'light'){icon = sunIcon}
  else{icon = moonIcon};

  const iconClick = () => {
    if(theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return(
    <div className='app' data-theme={theme}>
    <main>
      <header>
        <h1 className='title'>TODO</h1>
        <img src={icon} alt='color theme switch' onClick={iconClick} className='icon' />
      </header>
      <Input />
    </main>
    <footer>

    </footer>
    </div>
  )
}

export default App;

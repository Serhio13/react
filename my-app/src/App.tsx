import React from 'react';
import Books from './books';
import Characters from './characters';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CharactersF from './characters/characters-f';
import MyProvider from './context/provider';
import FormComponent from './components/form';


function App() {
  
  return (
    <MyProvider>
      <div className='wrapper'>
        {/* <Books /> */}
        <CharactersF />
        <FormComponent/>
      </div >
    </MyProvider>
  
  )

}
export default App;

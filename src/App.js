import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'; 
import Form from './Components/Form/Form'; 
import Header from './Components/Header/Header'; 
import { Route, Switch } from 'react-router-dom'; 


export default function App() {
  return (
    <div className="App">
        <Header /> 
        
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/add' component={Form}/>
          <Route path='/edit/:id' component={Form} />
        </Switch>
      </div>
  )
};

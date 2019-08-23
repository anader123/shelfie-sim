import React, { Component } from 'react'
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'; 
import Form from './Components/Form/Form'; 
import Header from './Components/Header/Header'; 
import axios from 'axios'; 



export default class App extends Component {
  constructor() {
    super(); 

    this.state = {
      inventory: [], 
      selectedProduct: {}
    }
  };

  componentDidMount() {
    this.getInventory(); 
  };

  storeSelectedProduct = (id) => {
    const index = id - 1 
    this.setState({
      selectedProduct: this.state.inventory[index]
    })
  }

  getInventory = () => {
    axios.get('/api/inventory')
    .then(response => {
      this.setState({
        inventory: response.data 
      })
    })
  };

  render() {
    return (
      <div className="App">
        <Header /> 
        <div className="products-form-container">
          <Dashboard inventory={this.state.inventory} getInventory={this.getInventory} storeSelectedProduct={this.storeSelectedProduct}/> 
          <Form getInventory={this.getInventory} selectedProduct={this.state.selectedProduct}/> 
        </div>
      </div>
    )
  }
};



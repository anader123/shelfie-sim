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
      selectedProduct: {},
      editingProduct: false 
    }
  };

  componentDidMount() {
    this.getInventory(); 
  };

  storeSelectedProduct = (product) => {
    this.setState({
      selectedProduct: product
    })
    this.handleEditToggle(); 
  }

  getInventory = () => {
    axios.get('/api/inventory')
    .then(response => {
      this.setState({
        inventory: response.data 
      })
    })
  };

  handleEditToggle = () => {
    this.setState({
        editingProduct: true
    })
  };

  render() {
    return (
      <div className="App">
        <Header /> 
        <div className="products-form-container">
          <Dashboard inventory={this.state.inventory} getInventory={this.getInventory} storeSelectedProduct={this.storeSelectedProduct} handleEditToggle={this.handleEditToggle}/> 
          <Form getInventory={this.getInventory} selectedProduct={this.state.selectedProduct} editingProduct={this.state.editingProduct}/> 
        </div>
      </div>
    )
  }
};



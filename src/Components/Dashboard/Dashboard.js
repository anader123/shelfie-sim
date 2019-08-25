import React, { Component } from 'react'; 
import Product from '../Product/Product'; 
import axios from 'axios';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor() {
        super(); 
        
        this.state = {
            inventory: [], 
        }
    }

    componentDidMount() {
        this.getInventory(); 
      };
      
    getInventory = () => {
        axios.get('/api/inventory')
        .then(response => {
          this.setState({
            inventory: response.data 
          })
        })
      };
      
    deleteProduct = (id) => {
        axios.delete(`/api/products/${id}`)
            .then(() => {
                this.getInventory();
            })
            .catch(error => {console.log('Error in Dashboard:', error)})
    }
    render() {
        const { inventory } = this.state; 
        const mappedInventory = inventory.map((product, index) => {
            return(
                <Product key={index} product={product} deleteProduct={this.deleteProduct} 
                handleEditToggle={this.props.handleEditToggle}/> 
            )
        })
        return (
            <div className='products-flex-div'>
                    {mappedInventory}
            </div>
        )
    }
}

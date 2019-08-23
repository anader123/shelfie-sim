import React, { Component } from 'react'; 
import Product from '../Product/Product'; 
import axios from 'axios';

export default class Dashboard extends Component {

    deleteProduct = (id) => {
        // const {id} = this.props.match.params;
        axios.delete(`/api/products/${id}`)
            .then(() => {
                this.props.getInventory();
            })
            .catch(error => {console.log('Error in Dashboard:', error)})
    }
    render() {
        const { inventory } = this.props; 
        const mappedInventory = inventory.map((product, index) => {
            return(
                <Product key={index} product={product} deleteProduct={this.deleteProduct} storeSelectedProduct={this.props.storeSelectedProduct}/> 
            )
        })
        return (
            <div>
                Dashboard
                <div className='products-flex-div'>
                    {mappedInventory}
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios';
import './Form.css'

export default class Form extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            price: 0, 
            img: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fac%2FNo_image_available.svg%2F600px-No_image_available.svg.png&f=1', 
            selectedId: null,
        }
    };

    componentDidUpdate(prevProps) {
        const { selectedProduct } = this. props; 
    
        if(selectedProduct !== prevProps.selectedProduct) {
            this.setState({
            name: selectedProduct.name, 
            price: selectedProduct.price,
            img: selectedProduct.img,  
            selectedId: selectedProduct.id
        })
        }
    };

    handleName = (value) => {
        this.setState({
            name: value 
        })
    };

    handlePrice = (value) => {
        this.setState({
            price: value 
        })
    };

    handleImageUrl = (value) => {
        this.setState({
            img: value
        })
    };

    cancelProduct = () => {
        this.setState({
            name: '',
            price: 0, 
            img: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fac%2FNo_image_available.svg%2F600px-No_image_available.svg.png&f=1',
            selectedId: null,
        })
    };

    createProduct = () => {
        axios.post('/api/product', {
            name: this.state.name, 
            price: this.state.price, 
            img: this.state.img
        })
            .then( response => {
                this.props.getInventory() 
                this.cancelProduct() 
            }
        )
    };

    updateProduct = (id) => {
        axios.put(`/api/products/${id}`, {
            name: this.state.name, 
            price: this.state.price, 
            img: this.state.img
        })
            .then(response => {
                this.props.getInventory() 
                this.cancelProduct() 
            })
    }

    render() {
        const { name, price, img, selectedId } = this.state; 
        return (
            <div>
                {!this.props.editingProduct
                ?
                (<div className='form-container'>
                    <div className='input-container'>
                        <img src={img} alt="" />
                        <label>Image URL:</label>
                        <input onChange={event => this.handleImageUrl(event.target.value)} value={img}></input>
                        <label>Product Name:</label>
                        <input onChange={event => this.handleName(event.target.value)} value={name}></input>
                        <label>Price:</label>
                        <input onChange={event => this.handlePrice(event.target.value)} value={price}></input>
                    </div>
                    <div className="form-buttons-container">
                        <button onClick={this.cancelProduct}>Cancel</button>
                        <button onClick={this.createProduct}>Add to Inventory</button>
                    </div>
                </div>
                )
                :
                (
                <div className='form-container'>
                    <div className='input-container'>
                        <img src={img} alt="" />
                        <label>Image URL:</label>
                        <input onChange={event => this.handleImageUrl(event.target.value)} value={img}></input>
                        <label>Product Name:</label>
                        <input onChange={event => this.handleName(event.target.value)} value={name}></input>
                        <label>Price:</label>
                        <input onChange={event => this.handlePrice(event.target.value)} value={price}></input>
                    </div>
                    <div className="form-buttons-container">
                        <button onClick={this.cancelProduct}>Cancel</button>
                        <button onClick={() => this.updateProduct(selectedId)}>Save Changes</button>
                    </div>
                </div>
                )
                }
            </div>
        )
    };
}

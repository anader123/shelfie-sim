import React, { Component } from 'react'
import axios from 'axios';
import './Form.css'

export default class Form extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            price: 0, 
            img: '', 
            selectedId: null,
            editingProduct: false 
        }
    };

    componentDidUpdate(prevProps) {
        if(this.props.selectedProduct !== prevProps.selectedProduct) {
        //     this.setState({
        //     selectedId: this.props.selectedProduct.id
        // })
            console.log(this.props.selectedProduct)

        }
    }

    handleName = (value) => {
        this.setState({
            name: value 
        })
    };

    handlePrice = (value) => {
        this.setState({
            price: value 
        })
        console.log(this.state.price)
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
            img: ''
        })
    }

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
    }

    handleToggle = () => {
        this.setState({
            editingProduct: !this.state.editingProduct
        })
    }

    render() {
        const { name, price, img } = this.state; 
        return (
            <div>
                {!this.state.editingProduct
                ?
                (<div className='form-container'>
                    <img src={img} alt="" />
                    <input onChange={event => this.handleImageUrl(event.target.value)} value={img} placeholder='Image URL:'></input>
                    <input onChange={event => this.handleName(event.target.value)} value={name} placeholder='Product Name:'></input>
                    <input onChange={event => this.handlePrice(event.target.value)} value={price} placeholder='Price:'></input>
                    <div className="form-buttons-container">
                        <button onClick={this.cancelProduct}>Cancel</button>
                        <button onClick={this.createProduct}>Add to Inventory</button>
                    </div>
                </div>
                )
                :
                (
                <div className='form-container'>
                    <img src={img} alt="" />
                    <input onChange={event => this.handleImageUrl(event.target.value)} value={img} placeholder='Image URL:'></input>

                    <input onChange={event => this.handleName(event.target.value)} value={name} placeholder='Product Name:'></input>

                    <input onChange={event => this.handlePrice(event.target.value)} value={price} placeholder='Price:'></input>
                    <div className="form-buttons-container">
                        <button onClick={this.cancelProduct}>Cancel</button>
                        <button>Save Changes</button>
                    </div>
                </div>
                )
                }
            </div>
        )
    };
}

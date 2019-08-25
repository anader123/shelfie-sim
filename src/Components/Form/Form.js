import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Form.css'

export default class Form extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            price: 0, 
            img: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fac%2FNo_image_available.svg%2F600px-No_image_available.svg.png&f=1', 
            editingProduct: false 
        }
    };

    componentDidUpdate(prevProps) {
        const id = this.props.match.params.id; 
        const prevId = prevProps.match.params.id; 
        if(id !== prevId) {
            this.setState({
            name: '',
            price: 0, 
            img: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fa%2Fac%2FNo_image_available.svg%2F600px-No_image_available.svg.png&f=1'  
        })
        }
    };

    componentDidMount() {
        const { id } = this.props.match.params; 
        if(id != null || undefined) {
            this.getProduct(); 
            this.handleEditToggle();
        }
    };

    handleEditToggle = () => {
        this.setState({
            editingProduct: true
        })
      };

    getProduct = () => {
        const { id } = this.props.match.params; 
        axios.get(`/api/product/${id}`)
            .then(response => {
                const { name, price, img} = response.data[0]; 
                this.setState({
                    name, 
                    price,
                    img
                })
            })
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
    };

    updateProduct = (id) => {
        axios.put(`/api/products/${id}`, {
            name: this.state.name, 
            price: this.state.price, 
            img: this.state.img
        })
    }

    render() {
        const { name, price, img } = this.state; 
        const { id } = this.props.match.params; 
        return (
            <div className='form-flex-div'>
                {!this.state.editingProduct
                ?
                (<div className='form-container'>
                    <div className='input-container'>
                        <img src={img} alt="" />
                        <label>Image URL:</label>
                        <input onChange={event => this.handleImageUrl(event.target.value)} ></input>
                        <label>Product Name:</label>
                        <input onChange={event => this.handleName(event.target.value)} value={name}></input>
                        <label>Price:</label>
                        <input onChange={event => this.handlePrice(event.target.value)} value={price}></input>
                    </div>
                    <div className="form-buttons-container">
                        <button onClick={this.cancelProduct}>Cancel</button>
                        <Link to='/'><button onClick={this.createProduct}>Add to Inventory</button></Link>
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
                        <Link to='/'>
                        <button>Cancel</button>
                        </Link>
                        <Link to='/'><button onClick={() => this.updateProduct(id)}>Save Changes</button>
                        </Link>
                    </div>
                </div>
                )
                }
            </div>
        )
    };
}

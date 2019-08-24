import React from 'react';
import './Product.css'

const Product = (props) => {
    const { name, price, img } = props.product; 
    const id = props.product.id; 
    return (
        <div className='product-container'>
            <img src={img}/>
            <div className='product-info-buttons'>
                <div className='info-container'>
                    <span>{name}</span>
                    <span>${price}</span>
                </div>
                <div className='button-container'>
                    <button onClick={() => props.deleteProduct(id)}>Delete</button>
                    <button onClick={() => props.storeSelectedProduct(props.product)}>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default Product; 
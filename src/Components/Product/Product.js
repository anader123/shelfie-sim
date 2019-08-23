import React from 'react'

const Product = (props) => {
    const { name, price, img } = props.product; 
    const id = props.product.id; 
    return (
        <div className='product-container'>
            <img src={img}/>
            <div className='product-info-buttons'>
                <span>{name}</span>
                <span>${price}</span>
                <button onClick={() => props.deleteProduct(id)}>Delete</button>
                <button onClick={() => props.storeSelectedProduct(id)}>Edit</button>
            </div>
        </div>
    )
}

export default Product; 
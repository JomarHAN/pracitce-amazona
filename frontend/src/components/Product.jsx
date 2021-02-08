import React from 'react'

function Product({ product }) {
    return (
        <div className="card" key={product._id}>
            <a href={`/product/${product._id}`}>

                <img className="medium" src={product.image} alt="product" />
            </a>
            <div className="card-body">
                <a href="product.html">
                    <h2>{product.name}</h2>
                </a>
                <div className="rating">
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                    <span> <i className="fa fa-star"></i> </span>
                </div>
                <div className="price">${product.price}</div>
            </div>
        </div>
    )
}

export default Product

import React, { Component } from 'react';
import CartIcon from '../icons/empty-cart-w.svg';
import { Link } from 'react-router-dom';

class Product extends Component {
  handleProduct(e, product) {
    if (e.target.className.includes('add-to-cart') || e.target.parentElement.className.includes('add-to-cart')){
      this.props.handleBag(product, 'add')
    }else {
      this.props.handleCurrentPropduct(product)
    }
  }
  
  render() {
    const price = (product) =>  product.prices.filter((p) => p.currency.symbol === this.props.currency )[0]
    
    return (
      <section>
        {
          this.props.category.products.map((product) => (
            <div 
              className={product.inStock ? "product" : 'product outStock'} 
              key={product.id}
              onClick={(e) => this.handleProduct(e, product)}
            >
              <div className="product-top">
                <div className="product-img">
                  <img src={product.gallery[0]} alt={product.name} />
                </div>
                
                {!product.inStock &&
                  <h2 className="outStock-title">OUT OF STOCK</h2>
                }

                {product.inStock &&
                  <button 
                    className="add-to-cart center-by-flex"
                    onClick={(e) => this.handleProduct(e, product)}
                  >
                    <img src={CartIcon} alt='cart icon' />
                  </button>
                }
                {product.inStock && <Link to='/product-page' className='view-product'> View Product</Link>}
                
              </div>
              <p className="product-name">{ product.brand +' '+ product.name}</p>
              <p className="product-price">{ price(product).currency.symbol +' '+ price(product).amount}</p>
            </div>
          ))
        }
      </section>
    )
  }
}

export default Product;
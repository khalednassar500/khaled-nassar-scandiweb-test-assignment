import React,{ Component } from "react";
import CartIcon from '../icons/empty-cart.svg';
import Bag from './Bag';
import { Link } from 'react-router-dom';

class CartOverlay extends Component {

  render() {
    const bag = this.props.bag.allProduct;

    return (
      <div>
        <div 
          className='cart-overlay t'
          onClick={() => this.props.toggleCurrency('cart')}
        >
          {bag.length > 0 && <p className='count center-by-flex t'>{this.props.bag.totalQuantity > 0 ? this.props.bag.totalQuantity : ''}</p>}
          <img className='cart-overlay-img t' src={CartIcon} alt='cart overlay' />
        </div>

        {this.props.onActive &&
          <div className="bag t">
            <h4 className="bag-title t">My Bag <span className="t">{bag.length} items</span></h4>
            <Bag 
              bag={this.props.bag} 
              handleBag={this.props.handleBag}
              currency={this.props.currency}
              handleBagTotalQuantity={this.props.handleBagTotalQuantity}
            />
            <div className='total-price t'>
              <p className="t">Total</p>
              <h4 className="t">{this.props.totalPrice()}</h4>
            </div>
            <div className="cart-overlay-links">
              <Link to='/cart-page' className="link">VIEW BAG</Link>
              <button className="link">CHECK OUT</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default CartOverlay;
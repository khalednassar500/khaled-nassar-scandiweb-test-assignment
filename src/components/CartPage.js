import React,{ Component } from "react";
import Bag from "./Bag";

class CartPage extends Component {
  render() {
    return (
      <div className="cart-page ">
        <h1>CART</h1>
        <Bag 
          bag={this.props.bag} 
          handleBagTotalQuantity={this.props.handleBagTotalQuantity}
          currency={this.props.currency}
          handleBag={this.props.handleBag}
          />
        <div className="q">
          <p><span>Tax 21%:</span><span>$42.00</span></p>
          <p><span>Quantity</span><span>{this.props.bag.totalQuantity > 0 ? this.props.bag.totalQuantity : ''}</span></p>
          <p><span>Total:</span><span>{this.props.totalPrice()}</span></p>
          <button>ORDER</button>
        </div>
      </div>
    )
  }
}

export default CartPage;
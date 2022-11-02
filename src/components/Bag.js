import React,{ Component } from "react";
import BagProduct from './BagProduct';

class Bag extends Component {

  render() {
    const bag = this.props.bag.allProduct;

    return (
      <div className="main-bag">
        {
          bag.map((product) => (
            <BagProduct 
              product={product}
              key={product.id}
              currency={this.props.currency}
              handleBag={this.props.handleBag}
              handleBagTotalQuantity={this.props.handleBagTotalQuantity}
            />
          ))
        }
      </div>
    )
  }
}

export default Bag;
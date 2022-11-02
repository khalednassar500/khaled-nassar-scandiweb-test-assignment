import React,{ Component } from "react";
import Attributes from "./Attributes";
import { Markup } from 'interweave';

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state= {
      bigImage: ''
    }
  }

  handleBigImage(img) {
    this.setState({
      bigImage: img
    })
  }

  render() {
    const Product = this.props.product;
    const Price = Product && Product.prices.filter((p) => p.currency.symbol === this.props.currency )[0];

    return (
      <div>
        {Product && <div className="product-page">
          <section className="product-images">
            <div className="small-images">
              {
                Product.gallery.map((g) => (
                  <div key={g} onClick={() => this.handleBigImage(g)}>
                    <img src={g} alt={Product.name} />
                  </div>
                ))
              }
            </div>
            <div className="big-image">
              <img src={this.state.bigImage ? this.state.bigImage : Product.gallery[0]} alt={Product.name} />
            </div>
          </section>
          <section className="product-attributes">
            <h2> {Product.brand} <br /> 
              <span>{Product.name}</span>
            </h2>
            <Attributes attributes={Product.attributes}/>
            <h4 className="price"> <span>Price:</span> <br /> {Price.currency.symbol +' '+ Price.amount}</h4>
            <button onClick={() => this.props.handleBag(Product, 'add')}>ADD TO CART</button>
            <div className="product-description">
              <Markup content={Product.description} />
            </div>
          </section>
        </div>}
      </div>
    )
  }
}

export default ProductPage;

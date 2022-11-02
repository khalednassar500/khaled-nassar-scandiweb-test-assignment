import React,{ Component } from "react";
import Attributes from "./Attributes";
import Plus from '../icons/plus-square.svg';
import Minus from '../icons/minus-square.svg';

class BagProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      c: 0
    }
  }

  arrowAction([...photos], action) {
    let c = this.state.c;

    const setImg = (i, c) => {
      this.setState({
        img : i,
        c: c
      })
    }
    
    if (action === 'right') {
      c++;
      if (c < photos.length) {
        setImg(photos[c], c);
      }else {
        setImg(photos[0], 0);
      }
    }else if (action === 'left') {
      c--;
      if (c < 0) {
        setImg(photos[photos.length-1], photos.length-1);
      }else {
        setImg(photos[c], c);
      }
    }
  }

  handleCount(p, state) {
    if (state === '-' && p.count >= 2) {
      this.props.handleBagTotalQuantity(p.id, '-');
    }else if (state === '+') {
      this.props.handleBagTotalQuantity(p.id, '+');
    }
  }

  render() {
    const product = this.props.product;
    const Price = (product) => product.prices.filter((p) => p.currency.symbol === this.props.currency )[0];
    const img = this.state.img;

    return (
      <div className="bag-product t">
              <div className="bag-product-options t">
                <p className="name t">{product.brand} <br /> <span>{product.name}</span></p>
                <p className="product-bag-price t">
                  { Price(product).currency.symbol +' '+ Price(product).amount}
                </p>
                
                <Attributes attributes={product.attributes}/>
              </div>
              
              <div className="bag-product-img t">
                <div className="product-count t">
                  <img 
                    src={Plus} 
                    className="c t" 
                    alt='plus icon' 
                    onClick={() => this.handleCount(product, '+')}
                    />
                  <p className="product-num t">{product.count}</p>
                  <img 
                    src={Minus} 
                    className="c t" 
                    alt='minus icon' 
                    onClick={() => this.handleCount(product, '-')}
                    />
                </div>
                
                <div className="bag-img t">
                  <img className="t" src={img ? img :product.gallery[0]} alt={product.name}/>
                  <button 
                    className="remove-button t"
                    onClick={() => this.props.handleBag(product, 'remove')}
                  >✘</button>
                  {
                    product.gallery.length > 1 && 
                    <div className="arrows">
                      <button 
                        className="l-arrow" 
                        onClick={() => this.arrowAction(product.gallery, 'left')}
                      >‹</button>  
                      <button 
                        className="r-arrow"
                        onClick={() => this.arrowAction(product.gallery, 'right')}
                        >›</button>  
                    </div>
                  }
                </div>
              </div>
            </div>
    )
  }
}

export default BagProduct;
import React, { Component } from 'react';
import VectorIcon from '../icons/vector.svg';

class CurrencySwitcher extends Component {

  render() {
    return (
      <div className={`${this.props.onActive ? 'currency-active' : ''} currency-switcher center-by-flex`}>
        <button 
          className='currency-switcher-icon center-by-flex t'
          onClick={() => this.props.toggleCurrency('currency')}  
        >
          <span className='t'>{this.props.currentCurrency}</span>
          <img className='t' src={VectorIcon} alt='vector symbole' />
        </button>
        
        <ul className='currency-table'>
          {this.props.currencies.map((c) => (
            <li 
              key={c.label}
              onClick={() => this.props.handleCurrency(c.symbol)}
            >
              {c.symbol} {c.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }
} 

export default CurrencySwitcher;
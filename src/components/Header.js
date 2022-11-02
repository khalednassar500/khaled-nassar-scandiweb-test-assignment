import  React, { Component } from 'react';
import Logo from '../icons/logo.svg';
import CartOverlay from './CartOverlay';
import CurrencySwitcher from './CurrencySwitcher';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleHeaderAction = this.toggleHeaderAction.bind(this)
    this.windowClick = this.windowClick.bind(this)
    this.state = {
      headerAction: '',
    }
  }

  windowClick(e) {
    if (this.state.headerAction) {
      const t = e.target.className.split(' ');
      if (!t.includes('t')) {
        this.toggleHeaderAction(this.state.headerAction);
      }
    }
  }

  toggleHeaderAction(action) {  //This function will work for both Currency Switcher and Cart overlay
    const CurrentAction = this.state.headerAction;
    if (action === CurrentAction) {
      this.setState({
        headerAction: ''
      });
      window.removeEventListener('click',this.windowClick );
    }else {
      this.setState({
        headerAction: action,
      });
      window.addEventListener('click',this.windowClick );
    }
  }

  render() {
    return (
      <div className='app-header'>
        <header>
          <nav className='header-navigation'>
            <ul>
              <li className='on-active'>WOMEN</li>
              <li>MEN</li>
              <li>KIDS</li>
            </ul>
          </nav>

          <div className='app-logo'>
            <img src={Logo} alt='application logo' />
          </div>

          <div className='header-actions'>
            <CurrencySwitcher 
              onActive={this.state.headerAction === 'currency' ? true : false}
              toggleCurrency={this.toggleHeaderAction}
              handleCurrency={this.props.handleCurrency}
              currencies={this.props.currencies}
              currentCurrency={this.props.currentCurrency}
            />
            <CartOverlay  
              onActive={(this.state.headerAction === 'cart' && this.props.bag.allProduct.length) ? true : false}
              toggleCurrency={this.toggleHeaderAction}
              bag={this.props.bag}
              handleBag={this.props.handleBag}
              currency={this.props.currentCurrency}
              totalPrice={() => this.props.totalPrice()}
              handleBagTotalQuantity={this.props.handleBagTotalQuantity}
            />
          </div>
        </header>

        <div className={`${(this.state.headerAction === 'cart' && this.props.bag.allProduct.length) ? 'backAtive' : ''} backDesign`}>{/* this element is just for design */}</div>
      </div>
    )
  }
}

export default Header;

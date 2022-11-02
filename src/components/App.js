import React,{ Component } from 'react';
import '../styles/App.css';
import Categories from './Categories';
import ProductPage from './ProductPage';
import Header from './Header';
import {Routes, Route} from 'react-router-dom';
import CartPage from './CartPage';
import { request, gql } from 'graphql-request';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.handleBag = this.handleBag.bind(this);
    this.handleCurrentPropduct = this.handleCurrentPropduct.bind(this);
    this.handleBagTotalQuantity = this.handleBagTotalQuantity.bind(this);
    
    this.state = {
      currencies: '',
      currentCurrency: '',
      categories: [],
      bag: {
        productsID: [],
        allProduct: [],
        totalQuantity: 0
      },
      currentProduct: ""
    }
  }

  componentDidMount() {
    const QUERY =gql`
      {
        currencies {
          symbol,
          label
        },
        categories {
          name
          products{
            id 
            name 
            inStock
            gallery
            description
            category
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            brand
          }}
      }
      `;
      request('http://localhost:4000/',QUERY)
        .then((data) => {
          const currentCurrency = data.currencies[0].symbol;
          const currencies = data.currencies;
          const categories = data.categories;
          
          this.setState({
            categories: categories,
            currencies: currencies,
            currentCurrency: currentCurrency
          })
        });

  }

  handleCurrency(currency) {
    this.setState({ currentCurrency: currency });
  }

  handleBag(product, action) {
    const productsID = [...this.state.bag.productsID];

    if (action === 'add' && !productsID.includes(product.id)) {
      const allProduct = [...this.state.bag.allProduct];

      const newProduct = {...product};
      newProduct.count = 1;

      this.setState({ 
        bag: {
          productsID: [...productsID, product.id],
          allProduct: [...allProduct, newProduct],
          totalQuantity: this.state.bag.totalQuantity + 1
        },
      });
    }else if (action === 'remove') {
      const allProduct = this.state.bag.allProduct.filter((p) => (
                          p.id !== product.id  
                        ));
      const newId = productsID.filter((i) => (
                          i !== product.id  
                        ));

      this.setState({ 
        bag: {
          productsID: [...newId],
          allProduct: [...allProduct],
          totalQuantity: this.state.bag.totalQuantity - product.count
        },
      });
    }

  }

  handleBagTotalQuantity(id, s) {
    const allProduct = [...this.state.bag.allProduct];
    let totalQuantity = this.state.bag.totalQuantity;

    const newProduct = allProduct.map((p) => {
                                    if (p.id === id) {
                                      if (s === "+") {
                                        p.count++;
                                        totalQuantity++;
                                      }else {
                                        p.count--;
                                        totalQuantity--;
                                      }
                                    }
                                    return p
                                  });

    this.setState({ 
      bag: {
        productsID: [...this.state.bag.productsID],
        allProduct: [...newProduct],
        totalQuantity: totalQuantity
      },
    });  
  }


  calculatePrice(products, currency) {
    const price = (product) => product.prices.filter((p) => p.currency.symbol === currency )[0].amount
    const allPrices = products.reduce((partialSum, a) => partialSum + (price(a) * a.count), 0);
    
    return this.state.currentCurrency + allPrices.toFixed(2)
  }

  handleCurrentPropduct(product) {
    this.setState({
      currentProduct: product
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.currentCurrency && <div>
          <Header 
            handleCurrency={this.handleCurrency}
            currencies={this.state.currencies}
            currentCurrency={this.state.currentCurrency}
            bag={this.state.bag}
            handleBagTotalQuantity={this.handleBagTotalQuantity}
            handleBag={this.handleBag}
            totalPrice={() => this.calculatePrice( this.state.bag.allProduct, this.state.currentCurrency )}
          />
          <Routes>
            <Route
              exact
              path='/'
              element={<Categories 
                categories={this.state.categories}
                currency={this.state.currentCurrency} 
                handleBag={this.handleBag}
                handleCurrentPropduct={this.handleCurrentPropduct}
              />}
            />
            <Route 
              path='/product-page'
              element={<ProductPage 
                product={this.state.currentProduct} 
                currency={this.state.currentCurrency}
                handleBag={this.handleBag} 
              />}
            />
            <Route 
              path="/cart-page"
              element={<CartPage 
                bag={this.state.bag}
                handleBag={this.handleBag}
                handleBagTotalQuantity={this.handleBagTotalQuantity}
                currency={this.state.currentCurrency} 
                totalPrice={() => this.calculatePrice( this.state.bag.allProduct, this.state.currentCurrency )}
              />}
            />
          </Routes>
        </div>}
      </div>
    );
  }
}

export default App;

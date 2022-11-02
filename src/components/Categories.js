import React, { Component } from "react";
import Product from "./Product";

class Categories extends Component {

  render() {
    return (
      <div className="categories">
        {
          this.props.categories.map((category) => (
            <div className="category" key={category.name}>
              <h1 className="category-name">{category.name.toUpperCase()}</h1>
              <Product 
                category={category}
                currency={this.props.currency}
                handleBag={this.props.handleBag}
                handleCurrentPropduct={this.props.handleCurrentPropduct}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export default Categories;
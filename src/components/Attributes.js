import React, {Component} from 'react';

class Attributes extends Component {
  render() {
    return (
      <div className='attributes t'>
        {this.props.attributes.map((a) => (
          <section key={a.id}  className="t">
            <h4 className="attribute-items-name t">{a.name}:</h4>
            <ul className='attribute-items t'>
            {
              a.items.map((i) => (
                <li  
                  className="t"
                  key={i.value} 
                  style={{backgroundColor: `${a.type === 'swatch' ? i.displayValue : ''}`}} 
                >
                  {a.type !== 'swatch' ? i.value : ''}
                </li>
              ))
            }
            </ul>
          </section>
        ))}
      </div>
    )
  }
}

export default Attributes;
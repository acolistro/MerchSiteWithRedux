import React from 'react';
import PropTypes from 'prop-types';

function Merch(props) {
  let quantity = '';
  if (props.quantity > 0) {
    quantity = <h3>Quantity available: {props.quantity}</h3>;
  } else {
    quantity = <h4>Out of stock</h4>;
  }

  const styledComponent = {
      border: '2px black solid',
      borderRadius: '15px',
      maxWidth: '400px',
      margin:'5px' 
    }

  return (
    
    <div style={styledComponent}>
      <h2>Item name: {props.name}</h2>
      <h4>Description: {props.description}</h4>
      <div>{quantity}</div>
      <button onClick={()=> props.whenAddToCartClicked(props)}>Add to cart</button>
      
      <button onClick={()=> props.whenRestockClicked(props)}>Restock</button>
      
      <button onClick={() => props.whenMerchClicked(props.id)}>Remove Item</button>
    </div>
  );
}

Merch.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string,
  whenMerchClicked: PropTypes.func,
  whenRestockClicked: PropTypes.func
};

export default Merch;
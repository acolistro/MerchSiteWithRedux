import React from 'react';
import PropTypes from "prop-types";
import Merch from './Merch';

function MerchList(props) {
  
  return (
    <React.Fragment>
      {props.merchList.map((merch) =>
      <Merch
      whenRestockClicked={props.onClickingRestock} 
      whenAddToCartClicked={props.onClickingAddToCart}
      whenMerchClicked={props.onClickingDelete}
      name={merch.name}
      description={merch.description}
      quantity={merch.quantity}
      id={merch.id}
      key={merch.id} />
      )}
    </React.Fragment>
  );
}

MerchList.propTypes = {
  merchList: PropTypes.array,
  onMerchSelection: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default MerchList;
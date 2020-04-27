import React from "react";
import MerchList from "./Merch/MerchList";
import NewMerchForm from "./Merch/NewMerchForm";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MerchControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,
      selectedMerch: null,
      editing: false
    };
  }

  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleClick = () => {
    if (this.state.selectedMerch != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedMerch: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  handleChangingSelectedMerch = (id) => {
    const selectedMerch = this.props.masterMerchList[id];
    this.setState({selectedMerch: selectedMerch});
  }
  
  handleAddingNewMerchToList = (newMerch) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity } = newMerch;
    const action = {
      type: 'ADD_MERCH',
      id: id,
      name: name,
      description: description,
      quantity: quantity
    }
    dispatch(action);
    this.setState({formVisibleOnPage: false});
  }

  handleDeletingMerch = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_MERCH',
      id: id
    }
    dispatch(action);
    this.setState({selectedMerch: null});
  }

  handleEditingMerchInList = (merchToEdit) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity } = merchToEdit;
    const action = {
      type: 'ADD_MERCH',
      id: id,
      name: name,
      description: description,
      quantity: quantity,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedMerch: null
    });
  }

  handleRestock = (item) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity } = item;
    const action = {
      type: 'ADD_MERCH',
      name: name,
      description: description,
      quantity: parseInt(quantity) + 1,
      id: id
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedMerch: null
    });
  }
  
  handleAddToCart = (item) => {
    const { dispatch } = this.props;
    const { id, name, description, quantity } = item;
    const action = {
      type: 'ADD_MERCH',
      name: name,
      description: description,
      quantity: parseInt(quantity) - 1,
      id: id
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedMerch: null
    });
  }
  
  render(){
    console.log(this.state.masterMerchList);
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewMerchForm onNewMerchCreation={this.handleAddingNewMerchToList} />;
      buttonText = "Return to Merch List";
    } else {
      currentlyVisibleState = <MerchList merchList={this.props.masterMerchList} 
      onMerchSelection={this.handleChangingSelectedMerch}
      onClickingDelete={this.handleDeletingMerch}
      onClickingRestock={this.handleRestock}
      onClickingAddToCart={this.handleAddToCart}/>;
      buttonText = "Add Merch"; 
    }
    return (
      <React.Fragment>
        <div>
          {currentlyVisibleState}
        </div>
        <div style={style2}>
          <button onClick={this.handleClick}>{buttonText}</button>
        </div>
      </React.Fragment>  
    );
  } 
}

const style2 = {
  display: 'inlineBlock'
}

MerchControl.propTypes = {
  masterMerchList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    masterMerchList: state
  }
}

MerchControl = connect(mapStateToProps)(MerchControl);

export default MerchControl;
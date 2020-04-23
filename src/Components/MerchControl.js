import React from "react";
import MerchList from "./Merch/MerchList";
import NewMerchForm from "./Merch/NewMerchForm";

class MerchControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      masterMerchList: [],
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
    const selectedMerch = this.state.masterMerchList.filter(merch => merch.id === id)[0];
    this.setState({selectedMerch: selectedMerch});
  }
  
  handleAddingNewMerchToList = (newMerch) => {
    const newMasterMerchList = this.state.masterMerchList.concat(newMerch);
    this.setState({masterMerchList: newMasterMerchList, formVisibleOnPage: false});
  }

  handleDeletingMerch = (id) => {
    const newMasterMerchList = this.state.masterMerchList.filter(merch => merch.id !== id);
    this.setState({masterMerchList: newMasterMerchList, selectedMerch: null})
  }

  handleEditingMerchInList = (merchToEdit) => {
    const editedMasterMerchList = this.state.masterMerchList
      .filter(merch => merch.id !== this.state.selectedMerch.id)
      .concat(merchToEdit);
      this.setState({masterMerchList: editedMasterMerchList, editing: false, selectedMerch: null});
  }

  
  handleRestock = (item) => {
    const newMasterMerchList = this.state.masterMerchList.filter(merch => merch.id !== item.id);
    const newMerchItem = {
      name: item.name,
      description: item.description,
      quantity: parseInt(item.quantity) + 1,
      id: item.id
    }
    const newerList = newMasterMerchList.concat(newMerchItem);
    this.setState({masterMerchList: newerList});
  }
  
  handleAddToCart = (item) => {
    const newMasterMerchList = this.state.masterMerchList.filter(merch => merch.id !== item.id);
    const newMerchItem = {
      name: item.name,
      description: item.description,
      quantity: parseInt(item.quantity) - 1,
      id: item.id
    }
    const newerList = newMasterMerchList.concat(newMerchItem);
    this.setState({masterMerchList: newerList});
  }
  
  render(){
    console.log(this.state.masterMerchList);
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewMerchForm onNewMerchCreation={this.handleAddingNewMerchToList} />;
      buttonText = "Return to Merch List";
    } else {
      currentlyVisibleState = <MerchList merchList={this.state.masterMerchList} 
      onMerchSelection={this.handleChangingSelectedMerch}
      onClickingDelete={this.handleDeletingMerch}
      onClickingRestock={this.handleRestock}
      onClickingAddToCart={this.handleAddToCart}/>;
      buttonText = "Add Merch"; 
    }
    return (
      <React.Fragment>
        <div style={style1}>
          {currentlyVisibleState}
        </div>
        <div style={style2}>
          <button onClick={this.handleClick}>{buttonText}</button>
        </div>
      </React.Fragment>  
    );
  }
  
}

const style1 = {

}

const style2 = {
  display: 'inlineBlock'
}

export default MerchControl;
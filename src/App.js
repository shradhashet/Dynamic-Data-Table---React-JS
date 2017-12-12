import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import ModalLayout from './components/ModalLayout';
import Table from './components/Table';



//setting custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: '400px',
    width: '600px'
  }
};


class App extends Component {
  constructor() {
    super();
     this.state = {
      modalIsOpen: false,
      showTable:false,
      columns:[],
      rowData:[]
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveData = this.saveData.bind(this);
  }


  //open modal method called for opening modal window
  openModal() {
    this.setState({
      modalIsOpen: true
    });
   
  }

 // closeModal methid for hiding the modal window
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  //this methods closes the modal Window 
 //and save user Defined Data and renders the table
  saveData(e) {
      this.setState({
        showTable: true,
         modalIsOpen: false
      });
  }
 


  columnUpdate(columns) {

   this.setState({columns:columns});
  }

  showTable(flag){
    this.setState({
      showTable:flag,
       columns:[],
       rowData:[]
    });
    
  }

  render() {

    return (
      <div className="app">
      <h1 className="header"> Dynamic Table</h1>
       {
        !this.state.showTable ?
        <button className = "addComponent" onClick ={this.openModal}>Add Table</button>:
        null
      }
       
        <Modal 
           isOpen = {this.state.modalIsOpen} 
           onAfterOpen = { this.afterOpenModal}
           onRequestClose = {this.closeModal} 
           style = { customStyles}
        >

          <ModalLayout showTable={this.state.showTable} columns={this.state.columns}  ColumnUpdate={this.columnUpdate.bind(this)}/>
          <div className = "footer">
             < button className = "done" onClick = { this.saveData}> Done < /button> 
             <button className = "cancel" onClick = {this.closeModal} > Cancel < /button> 
          </div>

       </Modal> 

          {this.state.showTable ?
           <Table columns = {this.state.columns} rowData={this.state.rowData} showTable={this.state.showTable} showTable={this.showTable.bind(this)}/>
           :null
          }  
      </div>
     
    );
  }
}
export default App;



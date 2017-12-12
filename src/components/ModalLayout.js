import React, {Component} from 'react';
import Modal from 'react-modal';
import Table from './Table';


//table row cell
class ColumnSet extends Component {
  constructor(props){
    super();
   this.state = {
    columnCount:[],
    data:props.columnDetails.columnName
   };
   this.setColumnName = this.setColumnName.bind(this);
  }

  setColumnName(e){
    // setting the cell data with user defined value
     let value = e.currentTarget.value
       this.setState({
         data:value
      });

    // Adding the cell data to the rowData
      this.state.columns.map((item) => item.columnName = (item.id == e.target.id) ? e.target.value : item.columnName);
      this.setState({
        columns: this.state.columns
      });  
  
  }
  render(){
     return (
      <div className = "input-group" > 
      <input onChange ={this.setColumnName} id ={this.props.columnDetails.id} value = {this.state.data}/>
       < /div>
     )

}
}


class ModalLayout extends Component {
  constructor(props) {
    super();
    this.state = {
      modalIsOpen: false,
      columns:props.columns,
      showTable:props.showTable
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);

  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';

  }

//get the user input for columns and generate Column Name and Data Type fields dynamically
  getColumnCount(e) {
    let count = e.target.value;
    let columnName;

    
   var columns = []
    //adding default column details
    for (var i = 0; i < count; i++) {
      columnName = 'Column' + (i + 1);

      columns.push({
        columnName: columnName,
        id: i + 1
      });
    }
    

    this.setState({
      columns:columns,
      columnCount: count
    });
    this.props.ColumnUpdate(columns);
  }

// renders the modal Window 
// calls and renders Table component once user saves the configuration changes
  render() {
  
    return (
     <div> 
        <h2 className = "header" ref = {subtitle => this.subtitle = subtitle} > 
         Choose layout 
        </h2>

         <form className = "formDetails">
           <b> Choose number of columns </b> <input onChange={this.getColumnCount.bind(this)} / >
            {this.state.columnCount > 0 ? <h4> Choose names of the columns </h4> :<div></div >}
             {this.state.columns.map((item,i) =>(
              <ColumnSet key={i} columns={this.state.columns} columnDetails={item} count={this.state.columnCount}/>
              ))}
        < /form> 
        < /div>
      );
    }
  }
  export default ModalLayout;
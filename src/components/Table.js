import React, { Component } from 'react';
import sortIcon from '../images/sort.png';
import editIcon from '../images/edit.png';
import  '../table.css';
import Pagination from './Pagination';

 //creating row data
 //const rowData =[];

//table header 
class Th extends Component{
  constructor(props){
    super();
    this.state={
      columns:props.columns
    }
  }
  render(){
    return(
        this.state.columns.map((item,i)=>(
          <th key={i}> 
              <a id={item.columnName} sortby="desc" onClick={this.props.sortdata} >
               {item.columnName}
               <img src={sortIcon}/>
              </a>
           </th>
         ))
      )
  }
}

//table row cell
class Td extends Component {
  constructor(props){
    super();
   this.state = {
    data:'',
    readOnly:true,
    rowData:props.rowData

   };
   this.onChange = this.onChange.bind(this);
   this.makeReadOnly = this.makeReadOnly.bind(this);
   
  }

  onChange(e){
    // setting the cell data with user defined value
     let value = e.currentTarget.value
       this.setState({
         data:value

      });

    // Adding the cell data to the rowData
     this.state.rowData.map((item) => {
          if(item === this.props.row){
             item[this.props.columnName]= e.target.value;
          }   
    });
   
  }

  makeEditable(){
    //making the cell editable on click
     this.setState({
      readOnly:false
     });
    
  }

  makeReadOnly(e){
     //making the cell read only on blur
    this.setState({
      readOnly:true
     });
  }

  render(){
    let readOnly = this.state.readOnly;
    
     return (
     <td onClick={this.makeEditable.bind(this)} onBlur={this.makeReadOnly}>
     {readOnly ?
      <span>{this.props.row[this.props.columnName]? this.props.row[this.props.columnName]:<span className="empty"><img src={editIcon}/></span> } </span>:
      <input type="text" placeholder="Edit Cell" onChange={this.onChange} ref={input => input && input.focus()} value={this.state.data}/>
     }
     </td>);

  }

}

// generating table
class Table extends Component{
  constructor(props) {
    super();
    this.state = {
      columns:props.columns,
      rowData:props.rowData,
      currentPage: 1,
      PerPage: 50,
      current:[],
      showTable:props.showTable
    };
     
    // adding atleast one row by default 
    this.addRow();
     
}


// adding dynamically on demand once addRow button is clicked
// adding emty cell data to the newly added row
 addRow(){
    let Data={};
    this.state.columns.map((item,i)=>{
      Data[item.columnName] = "";
    });

     this.state.rowData.push(Data);
     this.setState({rowData:this.state.rowData})
}

  //sort data asec or desc
sortData(e){
  let id = e.currentTarget.id;
  let sortby = e.currentTarget.getAttribute('sortby');
 
  if(sortby == "desc"){
  this.state.rowData.sort(function(a,b){
      if( a[id] > b[id]){
          return 1;
      }else if( a[id] < b[id] ){
          return -1;
      }
      return 0;
    },id);
       e.currentTarget.setAttribute('sortby','asce');
    }else{
     
      this.state.rowData.sort(function(a,b){
       if( a[id] < b[id]){
          return 1;
      }else if( a[id] > b[id] ){
          return -1;
      }
      return 0;
  },id);
        e.currentTarget.setAttribute('sortby','desc');
    }

  this.setState({rowData:this.state.rowData});
}

nextPage(e) {

    this.setState({
      currentPage: Number(e.target.id)
    });
  }
clear(){
  this.setState({
       showTable:false,
      
    });

  this.props.showTable(false);
 
}


render() {

    const indexOfLast = this.state.currentPage * this.state.PerPage;
    const indexOfFirst = indexOfLast - this.state.PerPage;
    this.state.current = this.state.rowData.slice(indexOfFirst, indexOfLast);
 
 return(

     <div className="table-container">
      <button className="addComponent" onClick={this.addRow.bind(this)}>Add Row</button>
       <button className="addComponent" onClick={this.clear.bind(this)}>Clear</button>
      <div className="table-data">
        <table>
          <thead>
          <tr>
           <Th columns={this.state.columns} sortdata={this.sortData.bind(this)}/>
            </tr>
         </thead>
        <tbody>
            {this.state.current.map((item,i) => (
              <tr key={i}>
                { this.props.columns.map((col,index)=>(
                  <Td key={index+i+this.state.currentPage} row={item} rowData={this.state.rowData} columnName={col.columnName}/>
                ))}
              </tr>
          ))}
        </tbody>
      </table>
      </div>
     
    
      <Pagination rowData={this.state.rowData} currentPage={this.state.currentPage} updatePagination={this.nextPage.bind(this)}/>
  </div>
);
  
}

}
export default Table;
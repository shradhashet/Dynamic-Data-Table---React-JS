import React, { Component } from 'react';
import Right from '../images/right.png';
import Left from '../images/left.png';

class Pagination extends Component {
  constructor(props) {
    super();
    this.state = {
      rowData:props.rowData,
      currentPage:props.currentPage,
      PerPage: 50
    };
   
  }

  
  render() {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.rowData.length /this.state.PerPage); i++) {
      pageNumbers.push(i);
    }

    let renderPageNumbers =[];

     pageNumbers.map(number => {
      renderPageNumbers.push(
        <li
          key={number}
          id={number}
          onClick={this.props.updatePagination}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="Paginator">
        <ul id="page-numbers">
           <li> <img src={Left}/><img src={Left}/> </li>
            <li> <img src={Left}/> </li>
          {renderPageNumbers}
          <li> <img src={Right}/>  </li>
          <li> <img src={Right}/> <img src={Right}/> </li>
        </ul>
      </div>
    );
  }
}



export default Pagination;


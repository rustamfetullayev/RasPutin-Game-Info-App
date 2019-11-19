import React, { Component } from "react";
import './Pagination.css';

export default class Pagination extends Component {
  render() {
    let pages = [];
    let currentPage = this.props.page;
    let pageCount = Math.floor(this.props.count / 20);
    console.log(pageCount);

    if (currentPage + 4 <= 9) {
      for (let i = 1; i <= 9; i++) {
        pages.push(
          <li key={i}>
            <span
              className={`pag-item${i === currentPage ? " active" : ""}`}
              onClick={() => this.props.loadComponent(i)}
            >
              {i}
            </span>
          </li>
        );
      }
    } else if (currentPage + 4 > 9 && currentPage + 4 < pageCount) {
      for (let i = currentPage - 4; i <= currentPage + 4; i++) {
        pages.push(
          <li key={i}>
            <span
              className={`pag-item${i === currentPage ? " active" : ""}`}
              onClick={() => this.props.loadComponent(i)}
            >
              {i}
            </span>
          </li>
        );
      }
    } else if (currentPage + 4 > pageCount) {
      for (
        let i = currentPage - (8 - (pageCount - currentPage));
        i <= pageCount;
        i++
      ) {
        pages.push(
          <li key={i}>
            <span
              className={`pag-item${i === currentPage ? " active" : ""}`}
              onClick={() => this.props.loadComponent(i)}
            >
              {i}
            </span>
          </li>
        );
      }
    }

    return (
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="col-md-8 offset-md-2">
            <div className="pagination">
              <ul className="pag-list">
                <li>
                  <span className='pag-item jump' onClick={() => this.props.loadComponent(1)}>first page</span>
                </li>
                {pages}
                <li>
                  <span className='pag-item jump' onClick={() => this.props.loadComponent(pageCount)}>last page</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

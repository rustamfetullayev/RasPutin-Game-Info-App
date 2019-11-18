import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    let pages = [];
    let currentPage = this.props.page;
    let pageCount = this.props.count / 20;
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
          <div className="col-md-6 offset-md-3">
            <div className="pagination">
              <ul className="pag-list">{pages}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

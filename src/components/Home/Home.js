import React, { Component } from "react";
import { server } from "../../hoc/Axios/Axios";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { Loader } from "../Loader/Loader";

export default class Home extends Component {
  state = {
    games: [],
    page: 1,
    loading: false
  };

  loadComponent = page => {
    this.setState({ loading: true });

    server
      .get(`games?page=${page}`)
      .then(response => {
        this.setState({
          games: response.data.results,
          page: page,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadComponent(1);
  }

  render() {
    let pages = [];
    for (let i = 1; i <= 10; i++) {
      pages.push(
        <li key={i}>
          <span className={`pag-item${i === this.state.page ? ' active' : ''}`} onClick={() => this.loadComponent(i)}>
            {i}
          </span>
        </li>
      );
    }

    return (
      <React.Fragment>
        {this.state.loading ? (
          <Loader />
        ) : (
          <section className='Home'>
            {/* Games content */}
            <div className="container">
              <div className="row pt-5 pb-5">
                {this.state.games.map(g => {
                  return (
                    <div className="col-md-3 mb-3" key={g.id}>
                      <div className="game-inner">
                        <NavLink to={`/games/${g.id}`}></NavLink>
                        <img src={g.background_image} alt="" />
                        <div className="text">
                          <p className="name">{g.name}</p>
                          <p className="role_count">{`Rating: ${g.rating}`}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            <div className="container">
              <div className="row pt-5 pb-5">
                <div className="col-md-6 offset-md-3">
                  <div className="pagination">
                    <ul className="pag-list">{pages}</ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </React.Fragment>
    );
  }
}

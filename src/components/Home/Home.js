import React, { Component } from "react";
import { server } from "../../hoc/Axios/Axios";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { Loader } from "../Loader/Loader";
import Pagintaion from "../Pagination/Pagination";

export default class Home extends Component {
  state = {
    games: [],
    page: 1,
    count: null,
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
          loading: false,
          count: response.data.count
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    if (this.props.location.page) {
      this.loadComponent(this.props.location.page);
    } else {
      this.loadComponent(1);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Loader />
        ) : (
          <section className="Home">
            {/* Games content */}
            <div className="container">
              <div className="row pt-5 pb-5">
                {this.state.games.map(g => {
                  return (
                    <div className="col-md-3 mb-3" key={g.id}>
                      <div className="game-inner">
                        <NavLink
                          to={{
                            pathname: `/games/${g.id}`,
                            page: this.state.page
                          }}
                        ></NavLink>
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
            <Pagintaion
              count={this.state.count}
              page={this.state.page}
              loadComponent={this.loadComponent}
            />
          </section>
        )}
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import { server } from "../../hoc/Axios/Axios";
import "./Game.css";

export default class Game extends Component {
  state = {
    loading: true,
    game: {}
  };

  componentDidMount() {
    this.setState({ loading: true });

    server
      .get(`${this.props.match.url}`)
      .then(response => {
        this.setState({
          loading: false,
          game: {
            name: response.data.name,
            description: response.data.description,
            background_image: response.data.background_image,
            background_image_additional:
              response.data.background_image_additional,
            requirements: {
              minimum: response.data.platforms[0].requirements
                ? response.data.platforms[0].requirements.minimum
                : null,
              recommended: response.data.platforms[0].requirements
                ? response.data.platforms[0].requirements.recommended
                : null
            },
            rating: response.data.rating,
            released: response.data.released,
            website: response.data.website
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Loader />
        ) : (
          <section className="Game">
            <div className="container">
              <div className="row">
                <div className="col-md-2">
                  <NavLink title="Back to previous page" className='back-to' to={{
                    pathname: `/`,
                    page: this.props.location.page
                  }}>←</NavLink>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row pt-5 pb-5">
                <div className="col-md-12 mb-5">
                  <div className="image-inner">
                    <img
                      src={this.state.game.background_image_additional}
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-5">
                  <div className="logo-inner">
                    <img src={this.state.game.background_image} alt="" />
                  </div>
                </div>
                <div className="col-md-7 mb-5">
                  <h2 className="title">{this.state.game.name}</h2>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: this.state.game.description
                    }}
                  ></div>
                </div>
                <div className="col-md-12">
                  <div className="statistics">
                    <div className="rating">
                      <ul>
                        <li>
                          <span>Rating: </span>
                          {this.state.game.rating}
                        </li>
                        <li>
                          <span>Relase date: </span>
                          <a target="blank" href={this.state.game.website}>
                            {this.state.game.released}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="requirements mb-3"
                      dangerouslySetInnerHTML={{
                        __html: this.state.game.requirements.minimum
                      }}
                    ></div>
                    <div
                      className="requirements mb-3"
                      dangerouslySetInnerHTML={{
                        __html: this.state.game.requirements.recommended
                      }}
                    ></div>
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

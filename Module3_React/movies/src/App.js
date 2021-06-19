import React, { Component } from "react";
import axios from "axios";
import {API_URL, API_KEY, IMAGE_URL} from "./API/secrets";
import Header from "./Components/Header/Header.jsx";
import Movies from "./Components/Movies/Movies.jsx";

class App extends Component {
  state = {};
  state = {
    moviesData : [],
    currentMovie : "avengers",
  };

  async componentDidMount() {
    // API Call
    // parameters => api key, page, query
    // https://api.themoviedb.org/3/search/movie?api_key=bdd243ea847239dc0799805e63e189f0&query=avengers&page=1&include_adult=false
    let data = await axios.get(API_URL + "/search/movie", {
      params : {api_key : API_KEY, page : 1, query : this.state.currentMovie},
    });

    let moviesData = data.data.results;

    this.setState({
      moviesData: moviesData
    })
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Movies movies={this.state.moviesData}></Movies>
      </div>
    );
  }
}

export default App;
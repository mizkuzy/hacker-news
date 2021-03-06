import React, { Component } from "react";
import "./App.css";
import Table from "../Table";
import {
  DEFAULT_HPP,
  DEFAULT_PAGE,
  DEFAULT_QUERY,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_BASE,
  PATH_SEARCH
} from "../../constants";
import Search from "../Search";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons";
import ButtonWithLoading from "../ButtonWithLoading";
import {
  updateResults,
  updateSearchTopStoriesState
} from "./hofUpdateStatefunctions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      isLoading: false
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    this.setState(updateResults(id));
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    // If setState relies on state or props than use setState((prevState, props)=>{})
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page) {
    this.setState({ isLoading: true });
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
    &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;

    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  render() {
    library.add(faSpinner, faSortUp, faSortDown);
    const { searchTerm, results, searchKey, isLoading } = this.state;
    const searchKeyResult = results && results[searchKey];
    const page = (searchKeyResult && searchKeyResult.page) || 0;
    const list = (searchKeyResult && searchKeyResult.hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table list={list} onDismiss={this.onDismiss} />
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import Table from "./Table";
import Search from "./Search";
import {
  DEFAULT_HPP,
  DEFAULT_PAGE,
  DEFAULT_QUERY,
  PARAM_HPP,
  PARAM_PAGE,
  PARAM_SEARCH,
  PATH_BASE,
  PATH_SEARCH
} from "./const";
import Button from "./Button";

class App extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        result: null,
        searchTerm: DEFAULT_QUERY,
      }
    ;

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id) {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
    this.setState(
      {
        result: {...this.state.result, hits: updatedHits}
      }
    )
  }

  setSearchTopStories(result) {
    const {hits, page} = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      result: {hits: updatedHits, page}
    });
  }

  fetchSearchTopStories(searchTerm, page) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}
    &${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;

    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result));
  }

  onSearchSubmit(event) {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);

    event.preventDefault();
  }

  componentDidMount() {
    const {searchTerm} = this.state;

    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
  }

  render() {
    const {searchTerm, result} = this.state;
    const page = (result && result.page) || 0;

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
        {result &&
        <Table
          list={result.hits}
          onDismiss={this.onDismiss}
        />}
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;

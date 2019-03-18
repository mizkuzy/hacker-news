import React, {Component} from 'react';
import './App.css';
import Table from "./Table";
import Search from "./Search";
import {DEFAULT_QUERY, PARAM_SEARCH, PATH_BASE, PATH_SEARCH} from "./const";

const isSearched = (searchTerm) => (item) => {
  return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
};

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
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm) {
    const input = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`;
    fetch(input)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result));
  }

  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const {searchTerm, result} = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
        {result &&
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          isSearched={isSearched}
        />}
      </div>
    );
  }
}

export default App;

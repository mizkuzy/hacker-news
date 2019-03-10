import React, {Component} from 'react';
import './App.css';
import Table from "./Table";
import Search from "./Search";

const
  list = [{
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectId: 0,
  }, {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectId: 1,
  },];

const isSearched = (searchTerm) => (item) => {
  return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
};

class App extends Component {

  constructor() {
    super();
    this.state =
      {
        list,
        searchTerm: '',
      }
    ;

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id) {
    this.setState(
      {
        list: this.state.list.filter(item => item.objectId !== id)
      }
    )
  }

  render() {
    const {list, searchTerm} = this.state;
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
        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          isSearched={isSearched}
        />
      </div>
    );
  }
}

export default App;

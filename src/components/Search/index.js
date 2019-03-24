import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const {value, onChange, onSubmit, children} = this.props
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => {
            this.input = node;
          }} // get access to node element in stateless component
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

export default Search
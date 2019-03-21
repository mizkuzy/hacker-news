import React from 'react';
import Button from "../Button";
import PropTypes from "prop-types";

const Table = ({list, onDismiss}) =>
  <div className="table">
    {
      list
        .map(item => (
          <div key={item.objectID} className="table-row">
            <span className="col-lg">
              <a href={item.url}>{item.title}</a>
            </span>
            <span className="col-md">
              {item.author}
            </span>
            <span className="col-sm">
              {item.num_comments}
            </span>
            <span className="col-sm">
              {item.points}
            </span>
            <span className="col-sm">
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
              Dismiss
              </Button>
            </span>
          </div>
        ))
    }
  </div>;

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Table
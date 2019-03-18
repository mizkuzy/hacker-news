import React from 'react';
import Button from "./Button";

const Table = ({list, pattern, onDismiss, isSearched}) =>
  <div className="table">
    {
      list.filter(isSearched(pattern))
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

export default Table
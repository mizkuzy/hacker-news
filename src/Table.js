import React from 'react';
import Button from "./Button";

const Table = ({list, pattern, onDismiss, isSearched}) =>
  list.filter(isSearched(pattern))
    .map(item => (
      <div key={item.objectId}>
        <span> <a href={item.url}>{item.title}</a> </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
              <Button
                onClick={() => onDismiss(item.objectId)}
              >
                Dismiss
              </Button>
            </span>
      </div>
    ));

export default Table
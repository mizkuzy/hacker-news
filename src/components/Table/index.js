import React from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import { SORTS } from "../App";
import Sort from "../Sort";

const Table = ({ list, onDismiss, sortKey, onSort, isSortReverse }) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

  return (
    <div className="table">
      <div className="table-header">
        <span className="col-lg">
          <Sort sortKey={"TITLE"} activeSortKey={sortKey} onSort={onSort}>
            Title
          </Sort>
        </span>
        <span className="col-md">
          <Sort sortKey={"AUTHOR"} activeSortKey={sortKey} onSort={onSort}>
            Author
          </Sort>
        </span>
        <span className="col-xs">
          <Sort sortKey={"COMMENTS"} activeSortKey={sortKey} onSort={onSort}>
            Comments
          </Sort>
        </span>
        <span className="col-xs">
          <Sort sortKey={"POINTS"} activeSortKey={sortKey} onSort={onSort}>
            Points
          </Sort>
        </span>
        <span className="col-xs">Archive</span>
      </div>
      {reverseSortedList.map(item => (
        <div key={item.objectID} className="table-row">
          <span className="col-lg">
            <a href={item.url}>{item.title}</a>
          </span>
          <span className="col-md">{item.author}</span>
          <span className="col-xs">{item.num_comments}</span>
          <span className="col-xs">{item.points}</span>
          <span className="col-sm">
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Table;

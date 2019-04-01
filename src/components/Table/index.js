import React, { Component } from "react";
import Button from "../Button";
import PropTypes from "prop-types";
import Sort from "../Sort";
import { sortBy } from "lodash";
import {updateSortKeyAndSortReverse} from "../App/hofUpdateStatefunctions";

export const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "NONE",
      isSortReverse: false
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    this.setState(updateSortKeyAndSortReverse(sortKey));
  }

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span className="col-lg">
            <Sort
              sortKey={"TITLE"}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onSort={this.onSort}
            >
              Title
            </Sort>
          </span>
          <span className="col-md">
            <Sort
              sortKey={"AUTHOR"}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onSort={this.onSort}
            >
              Author
            </Sort>
          </span>
          <span className="col-xs">
            <Sort
              sortKey={"COMMENTS"}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onSort={this.onSort}
            >
              Comments
            </Sort>
          </span>
          <span className="col-xs">
            <Sort
              sortKey={"POINTS"}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
              onSort={this.onSort}
            >
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
  }
}

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

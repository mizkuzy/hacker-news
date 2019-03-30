import Button from "./Button";
import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sort = ({ sortKey, activeSortKey, isSortReverse, onSort, children }) => {
  const isSortKeyActive = sortKey === activeSortKey;
  const sortClass = classNames("button-inline", {
    "button-active": isSortKeyActive
  });
  const iconColor = isSortKeyActive && isSortKeyActive ? "#808080" : "#A0A0A0";
  const sortIcon = isSortReverse ? ["fa", "sort-down"] : ["fa", "sort-up"];

  return (
    <div>
      <Button className={sortClass} onClick={() => onSort(sortKey)}>
        {children}
      </Button>
      <FontAwesomeIcon icon={sortIcon} color={iconColor} />
    </div>
  );
};

export default Sort;

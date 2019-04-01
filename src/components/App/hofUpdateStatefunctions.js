export const updateSearchTopStoriesState = (hits, page) => state => {
  const { searchKey, results } = state;

  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};

export const updateResults = id => state => {
  const { results, searchKey } = state;

  const { hits, page } = results[searchKey];
  const updatedHits = hits.filter(item => item.objectID !== id);

  return {
    results: { ...results, [searchKey]: { hits: updatedHits, page } }
  };
};

export const updateSortKeyAndSortReverse = sortKey => state => {
  const isSortReverse = state.sortKey === sortKey && !this.state.isSortReverse;

  return { sortKey, isSortReverse };
};

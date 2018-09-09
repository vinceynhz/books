import {connect} from "react-redux";
import * as qs from "query-string";

import {ResourceType, searchIsbn, selectResource, createBook} from "lib/actions";
import Search from "components/search/Search";

const mapStateToProps = (state, ownProps) => {
  const queryParams = Object.assign({}, qs.parse(ownProps.location.search));
  return {
    isbn: queryParams["isbn"],
    searching: state.searching,
    results: state.searchResults,
    status: state.searchResultStatus,
  };
};

const mapDispatchToProps = dispatch => ({
  onSearchIsbn: isbn => dispatch(searchIsbn(isbn)),
  onBookSelect: index => dispatch(selectResource(ResourceType.SEARCH, index)),
  onAddBook: (data, field) => dispatch(createBook({[field]: data})),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
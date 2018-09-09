import {connect} from "react-redux";
import history from "lib/history";

import BookForm from "components/books/BookForm";
import {addBook} from "lib/actions";

const getBookData = state => {
  if (state.selectedSearchResult === "") {
    return state.bookData;
  }
  return state.searchResults[state.selectedSearchResult];
};

const mapStateToProps = state => {
  return {
    bookData: getBookData(state),
    actionLegend: "Add Book",
    loading: false,
  };
};

const mapDispatchToProps = dispatch => ({
  onOk: book => dispatch(addBook(book)),
  onCancel: () => history.push("/"),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
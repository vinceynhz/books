import BookList from "components/BookList";
import {connect} from "react-redux";

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(
  mapStateToProps
)(BookList);
import {SearchStatus} from "lib/actions";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class Search extends Component {
  componentDidMount() {
    document.title = "Books :: Search";
    if (this.props.isbn) {
      this.props.onSearchIsbn(this.props.isbn);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isbn !== prevProps.isbn) {
      this.props.onSearchIsbn(this.props.isbn);
    }
  }

  componentWillUnmount() {
    document.title = "Books";
  }

  render() {
    return (
      <div>
        <h3>Searching for: {this.props.isbn}</h3>
        {this.props.searching && <span>Loading...</span>}
        {this.props.status === SearchStatus.NOT_FOUND && this.props.isbn &&
        <span>
          No books found :( <Link to={"/books/add"}
                                  onClick={() => this.props.onAddBook(this.props.isbn, "isbn")}>Add</Link>
        </span>}
        {this.props.status === SearchStatus.FOUND && this.props.results && this.props.results.length > 0 &&
        <div>
          <span>Results:</span>
          <ul>
            {this.props.results.map((result, index) => (
              <li key={index}>
                <Link to={"/books/add"} onClick={() => this.props.onBookSelect(index)}>{result.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        }
      </div>
    );
  }
}

Search.propTypes = {
  isbn: PropTypes.string,
  searching: PropTypes.bool,
  results: PropTypes.array,
  status: PropTypes.oneOf(Object.keys(SearchStatus)),
  onSearchIsbn: PropTypes.func.isRequired,
  onBookSelect: PropTypes.func.isRequired,
  onAddBook: PropTypes.func.isRequired,
};

Search.defaultProps = {
  searching: false,
  status: SearchStatus.NONE,
};

export default Search;
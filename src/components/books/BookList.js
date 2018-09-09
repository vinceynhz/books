import AlphabeticNavigation, {alphabetizeIds} from "components/AlphabeticNavigation";
import {BookPropType} from "lib/PropTypeDefs";
import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

// import "./BookList.css";

// const Book = ({id, book, selected, onSelectBook}) => {
//   const className = "book-container" + (selected ? " open" : "");
//   return (
//     <button className={className}
//             onClick={() => onSelectBook(id)}
//             style={{borderColor: book.avatarColor}}
//     >
//       <div className="initials" style={{backgroundColor: book.avatarColor}}>{book.initials}</div>
//       <div className="book">
//         <div className="title">{book.title}</div>
//         <div className="author">{book.author}</div>
//       </div>
//       <div className="chip-container">
//         {book.isbn !== "" && <span className="chip"><span className="label">ISBN</span>{book.isbn}</span>}
//         {book.format !== "" && <span className="chip"><span className="label">Format</span>{book.format}</span>}
//         {book.year !== "" && <span className="chip"><span className="label">Year</span>{book.year}</span>}
//       </div>
//     </button>
//   );
// };

const Book = ({id, book, authors, selected, onSelectBook, editPath, deletePath}) => (
  <div onClick={() => onSelectBook(id)}>
    <p>Title: {book.title}</p>
    {selected && <p>Author: {book.authors.map(authorId => authors[authorId].name)}</p>}
    {selected && <p>ISBN: {book.isbn}</p>}
    {selected && <p>Format: {book.format}</p>}
    {selected && <p>Year: {book.year}</p>}
    {selected && <p>Available: {book.quantity}</p>}
    {selected &&
    <span>
      <Link to={editPath}>Edit</Link>
      <Link to={deletePath}>Delete</Link>
    </span>}
    <hr/>
  </div>
);

Book.propTypes = {
  id: PropTypes.string.isRequired,
  book: BookPropType,
  authors: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectBook: PropTypes.func.isRequired,
  editPath: PropTypes.string.isRequired,
  deletePath: PropTypes.string.isRequired,
};

const BookList = ({books, authors, orderedBooks, selectedBook, onSelectBook, editPath, deletePath}) => {
  let booksAndHs = alphabetizeIds(orderedBooks, books, "orderingTitle",
    (bookId, book) => <Book key={bookId}
                            id={bookId}
                            book={book}
                            authors={authors}
                            selected={selectedBook === bookId}
                            onSelectBook={onSelectBook}
                            editPath={`${editPath}/${bookId}`}
                            deletePath={`${deletePath}/${bookId}`}/>
  );
  return (
    <div>
      {orderedBooks.length === 0 && <div>No books to show :(</div>}
      {orderedBooks.length >= 0 && <AlphabeticNavigation/>}
      {booksAndHs}
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.object.isRequired,
  authors: PropTypes.object.isRequired,
  orderedBooks: PropTypes.array.isRequired,
  selectedBook: PropTypes.string.isRequired,
  onSelectBook: PropTypes.func.isRequired,
  editPath: PropTypes.string.isRequired,
  deletePath: PropTypes.string.isRequired,
};

export default BookList;
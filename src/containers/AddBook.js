import {addBook} from "actions";
import React from "react";
import {connect} from "react-redux";

const AddBook = ({dispatch}) => {
  let title;
  let authors;
  let isbn;
  let format;
  let year;

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        console.log("addingBook");
        console.log("authors: ");
        console.log(authors.value.split(";"));
        dispatch(
          addBook({
            title: title.value,
            isbn: isbn.value,
            format: format.value,
            year: year.value,
            authors: authors.value.split(";")
          })
        );
      }}>
        <input ref={node => title = node}/>
        <input ref={node => authors = node}/>
        <input ref={node => isbn = node}/>
        <input ref={node => format = node}/>
        <input ref={node => year = node}/>
        <button type={"submit"}>Add Book</button>
      </form>
    </div>
  );
};

export default connect()(AddBook);
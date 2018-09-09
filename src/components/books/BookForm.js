import {BookFormat} from "lib/actions";
import React from "react";
import PropTypes from "prop-types";

const BookForm = ({bookData, actionLegend, loading, onOk, onCancel}) => {
  let title, authors, isbn, year, format;
  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && <form onSubmit={e => {
        e.preventDefault();
        onOk({
          title: title.value,
          isbn: isbn.value,
          format: format.value,
          year: year.value,
          authors: authors.value.split(";")
        });
      }}>
        <label>
          Title: <br/>
          <input defaultValue={bookData ? bookData.title : ""} ref={node => title = node}/><br/>
        </label>
        <label>
          Authors: <br/>
          <input defaultValue={bookData && bookData.authors ? bookData.authors.join(";") : ""}
                 ref={node => authors = node}/><br/>
        </label>
        <label>
          ISBN: <br/>
          <input defaultValue={bookData ? bookData.isbn : ""} ref={node => isbn = node}/><br/>
        </label>
        <label>
          Format: <br/>
          <select defaultValue={bookData && bookData.format ? bookData.format : ""} ref={node => format = node}>
            {Object.keys(BookFormat).map(
              index => <option key={BookFormat[index].value}
                               value={BookFormat[index].value}>{BookFormat[index].label}</option>
            )}
          </select><br/>
        </label>
        {bookData && !bookData.publishYears &&
        <label>
          Year:<br/>
          <input defaultValue={bookData.year} ref={node => year = node}/><br/>
        </label>}
        {bookData && bookData.publishYears &&
        <label>
          Publish Years:<br/>
          <select ref={node => year = node}>
            {bookData.publishYears.map(
              publishYear => <option key={publishYear} value={publishYear}>{publishYear}</option>
            )}
          </select><br/>
        </label>}
        <button type={"submit"}>{actionLegend}</button>
        <button onClick={onCancel}>Cancel</button>
      </form>}
    </div>
  );
};

BookForm.propTypes = {
  bookData: PropTypes.object,
  actionLegend: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BookForm;
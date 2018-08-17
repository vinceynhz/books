import PropTypes from "prop-types";
import {BookFormat} from "actions";

export let BookPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
  format: PropTypes.oneOf(Object.values(BookFormat)),
  isbn: PropTypes.string.isRequired,
}).isRequired;
import PropTypes from "prop-types";
import {BookFormat} from "lib/actions";

export let BookPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.array.isRequired,
  year: PropTypes.string.isRequired,
  format: PropTypes.oneOf(Object.values(BookFormat)).isRequired,
  isbn: PropTypes.string.isRequired,
  avatarColor: PropTypes.string,
  initials: PropTypes.string,
  orderingTitle: PropTypes.string,
}).isRequired;

export let AuthorPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  orderingName: PropTypes.string.isRequired,
}).isRequired;
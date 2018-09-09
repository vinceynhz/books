import PropTypes from "prop-types";
import {BookFormat} from "lib/actions";

export let BookPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.number).isRequired,
  year: PropTypes.string.isRequired,
  format: PropTypes.oneOf(Object.values(BookFormat).map(format => format.value)).isRequired,
  isbn: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  initials: PropTypes.string,
  orderingTitle: PropTypes.string,
  avatarColor: PropTypes.string,
}).isRequired;

export let AuthorPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.number).isRequired,
  orderingName: PropTypes.string.isRequired,
}).isRequired;
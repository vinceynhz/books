import {
  START_BARCODE_ENTRY,
  END_BARCODE_ENTRY,
  SELECT_RESOURCE,
  RECEIVE_DATA,
  REQUEST_DATA,
  REQUEST_ERROR,
  CREATE_BOOK,
  ResourceType,
  RequestScope,
  ResponseAction,
  SearchStatus,
} from "lib/actions";
import {combineReducers} from "redux";

export const CONTENT_BOOKS = "books";
export const CONTENT_AUTHORS = "authors";

/*
State of the whole application:
{
  libraryServiceId: uuid
  books : {
    id: {
      title: string,
      author: array<string>
      year: string,
      format: string<enum>,
      isbn: string,
      initials: string,
    },
  },
  updatingBooks: boolean,
  authors : {
    id: {
      name:
    },
    id: [book_id_4, book_id_5, book_id_6],
  },
  updatingAuthors: boolean,
  selectedBook: id,
  errorMessage: '',
  orderedBooks : [],
  orderedAuthors : [],
}
 */

/**
 * To check the elements of the response data and apply the changes dictated by the library service
 * @param state        all elements of given resource
 * @param responseData gotten from the library service
 * @returns {*} updated elements of resource
 * @private
 */
function _applyResponseDelta(state = {}, responseData) {
  let result = Object.assign({}, state);
  responseData.forEach(changedResource => {
    if (changedResource.action === ResponseAction.DELETED && result.hasOwnProperty(changedResource.id)) {
      delete result[changedResource.id];
    } else {
      result[changedResource.id] = Object.assign({}, changedResource);
    }
  });
  return result;
}

function _setDataFromContent(state = {}, responseContent) {
  return Object.assign({}, responseContent);
}

function _scopedReceive(state = {}, action, contentField) {
  switch (action.scope) {
    case RequestScope.ALL:
      return _setDataFromContent(state, action.data.content);
    case RequestScope.ONE:
      return _applyResponseDelta(state, action.data.content[contentField]);
    default:
      return state;
  }
}

function receiveFor(state = {}, action, mainResource, otherResource, contentField) {
  if (action.type === RECEIVE_DATA) {
    if (action.resource === mainResource) {
      return _scopedReceive(state, action, contentField);
    } else if (action.resource === otherResource
      && action.scope === RequestScope.ONE
      && action.data.content.hasOwnProperty(contentField)
      && action.data.content[contentField].length > 0) {
      return _applyResponseDelta(state, action.data.content[contentField]);
    }
  }
  return state;
}

function _sortData(state = [], data, orderingField, fallbackData) {
  return state.sort((a, b) => {
    let data_a = data.hasOwnProperty(a) ? data[a] : fallbackData[a];
    let data_b = data.hasOwnProperty(b) ? data[b] : fallbackData[b];
    return data_a[orderingField].localeCompare(data_b[orderingField]);
  });
}

function _orderResponseDelta(state = [], delta, resourceData, orderingField) {
  let newState = state.slice();
  let deltaOrderingIds = {};
  let shouldSort = false;
  delta.forEach(
    changedResource => {
      if (changedResource.action === ResponseAction.ADDED) {
        if (!shouldSort) shouldSort = true;
        newState.push(changedResource.id + "");
        deltaOrderingIds[changedResource.id] = {[orderingField]: changedResource[orderingField]};
      } else if (changedResource.action === ResponseAction.DELETED) {
        newState = newState.filter(element => element !== changedResource.id);
      }
    }
  );
  if (shouldSort) {
    return _sortData(newState, resourceData, orderingField, deltaOrderingIds);
  }
  return newState;
}

function _scopedOrdering(state = [], action, orderingField, contentField) {
  switch (action.scope) {
    case RequestScope.ALL:
      let content = action.data.content;
      return _sortData(Object.keys(content), content, orderingField);
    case RequestScope.ONE:
      return _orderResponseDelta(state, action.data.content[contentField], action.requestInfo[contentField], orderingField);
    default:
      return state;
  }
}

function orderingFor(state = [], action, resource, otherResource, orderingField, contentField) {
  if (action.type === RECEIVE_DATA) {
    if (action.resource === resource) {
      return _scopedOrdering(state, action, orderingField, contentField);
    } else if (action.resource === otherResource
      && action.scope === RequestScope.ONE
      && action.data.content.hasOwnProperty(contentField)
      && action.data.content[contentField].length > 0) {
      return _orderResponseDelta(state, action.data.content[contentField], action.requestInfo[contentField], orderingField);
    }
  }
  return state;
}

function updatingFor(state = false, action, resource) {
  if (action.resource === resource) {
    switch (action.type) {
      case REQUEST_DATA:
        return true;
      case RECEIVE_DATA:
      case REQUEST_ERROR:
        return false;
      default:
        // This will cascade to out of the if(). In the event of adding and else clause
        // this default should be changed to return the original state
        break;
    }
  }
  return state;
}

/**
 * When the user selects a resource from the UI by clicking on it
 * @param state    selected data for resource
 * @param action   dispatched
 * @param resource to match for selection
 * @returns        "" if the resource has been clicked again in which case it will remove the selection, or the data
 *                 issued by the dispatch
 */
function selectingFor(state = "", action, resource) {
  if (action.type === SELECT_RESOURCE && action.resource === resource) {
    return (state === action.id) ? "" : action.id;
  }
  return state;
}

function lastUpdateFor(state = new Date(0), action, resource) {
  if (action.resource === resource && action.type === RECEIVE_DATA) {
    return action.timestamp;
  }
  return state;
}

/*
book related states
 */
function bookData(state = {}, action) {
  if (action.type === SELECT_RESOURCE && action.resource === ResourceType.SEARCH) {
    // If we're selecting a result from the search, we remove any existent book data
    return {};
  }

  switch (action.type) {
    case CREATE_BOOK:
      return action.bookData;
    default:
      return state;
  }

}

/*
library service related states
*/
function libraryServiceId(state = "", action) {
  if (action.type === RECEIVE_DATA
    && (action.resource === ResourceType.BOOKS || action.resource === ResourceType.AUTHORS)) {
    return action.data["changeId"];
  }
  return state;
}

/*
error related states
 */
function errorMessage(state = "", action) {
  switch (action.type) {
    case REQUEST_ERROR:
      return action.resource + ":" + action.error.message;
    default:
      return state;
  }
}


/*
open library search related states
 */

function searchResultStatus(state = SearchStatus.NONE, action) {
  if (action.resource === ResourceType.SEARCH) {
    switch (action.type) {
      case REQUEST_DATA:
        return SearchStatus.NONE;
      case RECEIVE_DATA:
        if (action.data && action.data.hasOwnProperty("numFound") && action.data["numFound"] > 0) {
          return SearchStatus.FOUND;
        }
        return SearchStatus.NOT_FOUND;
      case REQUEST_ERROR:
        return SearchStatus.NOT_FOUND;
      default:
        // This will cascade to out of the if(). In the event of adding and else clause
        // this default should be changed to return the original state
        break;
    }
  }
  return state;
}

function capturingBarcode(state = false, action) {
  switch (action.type) {
    case START_BARCODE_ENTRY:
      return true;
    case END_BARCODE_ENTRY:
      return false;
    default:
      return state;
  }
}

function searchResults(state = [], action) {
  if (action.resource === ResourceType.SEARCH && action.type === RECEIVE_DATA) {
    let newSearchResults = [];
    if (action.data.hasOwnProperty("numFound") && action.data["numFound"] > 0) {
      newSearchResults = action.data["docs"].map(
        doc => ({
          title: doc["title_suggest"],
          authors: doc["author_name"],
          isbn: action.requestInfo,
          year: doc["publish_year"].length === 1 ? doc["publish_year"][0] : undefined,
          publishYears: doc["publish_year"].length > 1 ? doc["publish_year"] : undefined
        })
      );
    }
    return newSearchResults;
  }
  return state;
}


const bookApp = combineReducers({
  libraryServiceId,
  errorMessage,

  books: (state, action) => receiveFor(state, action, ResourceType.BOOKS, ResourceType.AUTHORS, CONTENT_BOOKS),
  updatingBooks: (state, action) => updatingFor(state, action, ResourceType.BOOKS),
  lastBooksUpdate: (state, action) => lastUpdateFor(state, action, ResourceType.BOOKS),
  orderedBooks: (state, action) => orderingFor(state, action, ResourceType.BOOKS, ResourceType.AUTHORS, "orderingTitle", CONTENT_BOOKS),
  selectedBook: (state, action) => selectingFor(state, action, ResourceType.BOOKS),
  bookData,

  authors: (state, action) => receiveFor(state, action, ResourceType.AUTHORS, ResourceType.BOOKS, CONTENT_AUTHORS),
  updatingAuthors: (state, action) => updatingFor(state, action, ResourceType.AUTHORS),
  lastAuthorsUpdate: (state, action) => lastUpdateFor(state, action, ResourceType.AUTHORS),
  orderedAuthors: (state, action) => orderingFor(state, action, ResourceType.AUTHORS, ResourceType.BOOKS, "orderingName", CONTENT_AUTHORS),
  selectedAuthor: (state, action) => selectingFor(state, action, ResourceType.AUTHORS),

  capturingBarcode,
  searching: (state, action) => updatingFor(state, action, ResourceType.SEARCH),
  searchResultStatus,
  searchResults,
  selectedSearchResult: (state, action) => selectingFor(state, action, ResourceType.SEARCH),
});

export default bookApp;
import React, {Component} from "react";

// import AddBook from "containers/AddBook";
import VisibleBooks from "containers/VisibleBooks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className={"book-container"}>
          <VisibleBooks/>
        </div>
      </div>
    );
  }
}

export default App;

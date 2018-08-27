import Icon from "components/icon/Icon";
import React from "react";

import './TopBar.css';

const TopBar = () => (
  <div className="top-bar">
    <div>Books</div>
    <Icon name="menu" color="black" size={24}/>
  </div>
);

export default TopBar;
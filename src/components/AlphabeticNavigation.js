import React from "react";

const NUMBER_ID = "0-9";
const TOP_ID = "top";

export function alphabetizeIds(idArray, contentArray, orderingField, generator) {
  let contentAndHeaders = [];
  let currentInd = 0;
  let gotH = false;
  let content, char, charId, isFirstSymbol, isFirstChar;
  idArray.forEach(
    contentId => {
      content = contentArray[contentId];
      char = content[orderingField].charCodeAt(0);
      isFirstSymbol = (currentInd === 0 && char < 97);
      isFirstChar = (char > currentInd);
      gotH = isFirstSymbol || isFirstChar;
      currentInd = isFirstSymbol ? 96 : isFirstChar ? char : currentInd;
      charId = isFirstSymbol ? NUMBER_ID : isFirstChar ? content[orderingField].charAt(0).toUpperCase() : null;
      if (gotH) {
        contentAndHeaders.push(<HeaderId key={`h${currentInd}`} id={charId}/>);
        contentAndHeaders.push(<AnchorId id={TOP_ID} label={"Top"} key={`a${currentInd}`}/>);
      }
      contentAndHeaders.push(generator(contentId, content));
    }
  );
  return contentAndHeaders;
}

function setFocusToId(id) {
  let target = document.getElementById(id);
  if (target) {
    target.focus();
  }
}

const AnchorId = ({id, label}) => (
  <a href={`#${id}`} onClick={() => setFocusToId(id)}>{label ? label : id}</a>
);

const HeaderId = ({id}) => (
  <h1 id={id}>{id}</h1>
);

const AlphabeticNavigation = () => {
  let letters = [];
  for (let i = 65; i <= 90; i++) {
    let char = String.fromCharCode(i);
    letters.push(<AnchorId key={i} id={char}/>);
  }
  return (
    <div id={TOP_ID}>
      <AnchorId id={NUMBER_ID}/>
      {letters}
    </div>
  );
};

export default AlphabeticNavigation;
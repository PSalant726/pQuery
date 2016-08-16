const DOMNodeCollection = require("./dom_node_collection.js");

const _docReadyCallbacks = [];
let _docReady = false;

window.$p = function (arg) {
  let retVal;
  switch (typeof arg) {
    case "function":
      if (!_docReady) _docReadyCallbacks.push(arg);
        else arg();
      break;
    case "string":
      let nodesArr = Array.from(document.querySelectorAll(arr));
      retVal = new DOMNodeCollection(nodesArr);
      break;
    case "object":
      if (arg instanceof HTMLElement) retVal = new DOMNodeCollection([arg]);
      break;
  }
  return retVal;
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});

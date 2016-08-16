const DOMNodeCollection = require("./dom_node_collection.js");

const _docReadyCallbacks = [];
let _docReady = false;

window.$p = arg => {
  let retVal;
  switch (typeof arg) {
    case "function":
      if (!_docReady) {
        _docReadyCallbacks.push(arg);
      } else {
        arg();
      }
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

$p.extend = (origObj, ...newObjs) => {
  newObjs.forEach(obj => {
    for (let prop in obj) {
      origObj[prop] = obj[prop];
    }
  });
  return origObj;
};

$p.ajax = options => {
  const req = new XMLHTTPRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };
  options = $p.extend(defaults, options);

  if (options.method.toUpperCase() === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  req.open(options.method, options.url, true);
  req.onload = event => {
    if (req.status === 200) {
      options.success(req.response);
    } else {
      options.error(req.reponse);
    }
  };

  req.send(JSON.stringify(options.data));
};

toQueryString = obj => {
  let result = "";
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docReadyCallbacks.forEach( func => func() );
});

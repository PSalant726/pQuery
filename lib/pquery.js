/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	const DOMNodeCollection = function (htmlArray) {
	  this.htmlElements = htmlArray;
	};

	DOMNodeCollection.prototype.html = function (string) {
	  if (string) {
	    this.htmlElements.forEach(el => {
	      el.innerHTML = string;
	    });
	  } else {
	    return this.htmlElements[0].innerHTML;
	  }
	};

	DOMNodeCollection.prototype.empty = function () {
	  this.htmlElements.forEach(el => {
	    el.innerHTML = "";
	  });
	};

	DOMNodeCollection.prototype.append = function (htmlArray) {
	  if (htmlArray instanceof DOMNodeCollection){
	    htmlArray.forEach(el => {
	      this.htmlElements.forEach(thisEl => {
	        thisEl.innerHTML += el.outerHTML;
	      });
	    });
	  } else if (htmlArray instanceof String) {
	    this.htmlElements.forEach(el => {
	      el.innerHTML += htmlArray;
	    });
	  }
	};

	DOMNodeCollection.prototype.attr = function (attrName, attrVal) {
	  if (typeof attrVal === undefined) {
	    this.htmlElements[0].getAttribute(attrName);
	  } else {
	    this.htmlElements.forEach(el => {
	      el.setAttribute(attrName, attrVal);
	    });
	  }
	};

	DOMNodeCollection.prototype.addClass = function (classVal) {
	  this.htmlElements.forEach(el => {
	    if (el.className.length !== 0) {
	      el.className += (' ' + classVal);
	    } else {
	      el.className = classVal;
	    }
	  });
	};

	DOMNodeCollection.prototype.removeClass = function (classVal) {
	  let classValArray = classVal.split(' ');
	  this.htmlElements.forEach(el => {
	    let currentClasses = el.className.split(' ');
	    let newClasses = currentClasses.filter(klass => {
	      return !classValArray.includes(klass);
	    });
	    el.className = newClasses.join(' ');
	  });
	};

	DOMNodeCollection.prototype.children = function () {
	  let kids = [];
	  this.htmlElements.forEach(el => {
	    kids = kids.concat(Array.from(el.children));
	  });
	  return new DOMNodeCollection(kids);
	};

	DOMNodeCollection.prototype.parent = function () {
	  let mom = [];
	  this.htmlElements.forEach(el => {
	    mom.push(el.parentNode);
	  });
	  return new DOMNodeCollection(mom);
	};

	DOMNodeCollection.prototype.find = function (selectors) {
	  let selected = [];
	  this.htmlElements.forEach(el => {
	    selected = selected.concat(Array.from(el.querySelectorAll(selectors)));
	  });
	  return new DOMNodeCollection(selected);
	};

	DOMNodeCollection.prototype.remove = function () {
	  this.htmlElements.forEach(el => { el.remove(); });
	  this.htmlElements = [];
	};

	DOMNodeCollection.prototype.on = function (eventType, callback) {
	  this.htmlElements.forEach(el => {
	    el.addEventListener(eventType, callback);
	  });
	};

	DOMNodeCollection.prototype.off = function (eventType, callback) {
	  this.htmlElements.forEach(el => {
	    el.removeEventListener(eventType, callback);
	  });
	};

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
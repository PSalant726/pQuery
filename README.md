# pQuery
A recreation of the most important jQuery functionality, using only vanilla JavaScript and the native DOM API.

## Getting Started

To incorporate pQuery into a project, first [webpack][webpack] the component files by running the following command:

[webpack]: https://webpack.github.io

```
webpack -g ./lib/main.js ./lib/pquery.js
```

You can now include `./lib/pquery.js` in the `<head>` tag of your HTML document like so:

```html
<head>
  <script src="./lib/pquery.js" charset="utf-8"></script>
</head>
```

## Core Function

$p is the Core Function of pQuery, which takes a single argument. The argument can be one of three data types: a function, a CSS selector, or an HTML element.

### Passing a Function

The function passed to the Core Function is temporarily queued in an array of functions to call upon `DOMContentLoaded`. pQuery will invoke the function once the DOM loads, and after invoking any functions that have been queued previously.

```JavaScript
const logString = textString => {
  console.log(textString);
};

$p(logString("Hello World!"));
```

### Passing a CSS selector

The Core Function returns an array of all HTML elements in the DOM that match the selector.

```JavaScript
var $divs = $p("div");
// => [<div>First div</div>, ... , <div>Last div</div>]

var $someClassNameEls = $p("someClassName");
// => [<div class="someClassName"></div>]

var $elWithId = $p("id");
// => [<div id="id"></div>]
```

### Passing an HTML Element

The Core Function returns a pQuery object for use with the public API.

```JavaScript
var $pQueryDiv = $p("<div></div>");
```

## pQuery Object API

#### addClass

Adds a class to an existing DOM element. If the DOM element already has a class defined, the class is appended to the element's classes.

```JavaScript
$pQueryObj.addClass(className);
```

#### append

For an array of DOM elements with `n` child elements, creates a new element or series of elements beginning with the `n + 1` position.

```JavaScript
var $pQueryObj = $p("<div>Parent <div>Old Child</div> </div>")
$pQueryObj.append("<div>New Child</div>");
// => <div>Parent <div>Old Child</div> <div>New Child</div> </div>
```

#### attr

When one argument is passed, will return the value of the argument attribute for each DOM element. When two arguments are passed, will set the value of the argument attribute to the passed value.

```JavaScript
$pQueryObj.attr(attributeName);

$pQueryObj.attr(attributeName, attributeVal);
```

#### children

Returns an array containing the child elements of DOM element(s).

```JavaScript
$pQueryObj.children();
```

#### empty

Clears the inner HTML of DOM elements(s).

```JavaScript
$pQueryObj.empty();
```

#### find

Returns DOM elements by CSS selector.

```JavaScript
$pQueryObj.find(selector);
```

#### html

When no argument is passed, returns the inner HTML of DOM elements. When one argument is passed, sets the inner HTML of DOM elements to the passed value.

```JavaScript
$pQueryObj.html();

$pQueryObj.html(newHTML);
```

#### off

Remove an event listener from DOM element(s).

```JavaScript
$pQueryObj.off(event, callback);
```

#### on

Add an event listener to DOM element(s).

```JavaScript
$pQueryObj.on(event, callback);
```

#### parent

Returns the parent element of DOM element(s).

```JavaScript
$pQueryObj.parent();
```

#### remove

Removes an element from the DOM.

```JavaScript
$pQueryObj.remove();
```

#### removeClass

Removes a class from DOM element(s).

```JavaScript
$pQueryObj.removeClass(className);
```

## AJAX

Utilizes the `XMLHTTPRequest` API to asynchronously send and receive data from a server. By default, the `$p.ajax` function sends a `GET` request to an empty URL, with neither a success nor an error callback included.

```JavaScript
// DEFAULT:

$p.ajax({
  url: "",
  method: 'GET',
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  data: {},
  success: () => {},
  error: () => {}  
});

// EXAMPLE:

$p.ajax({
  url: "/users",
  method: "PATCH",
  data: updatedInfo,
  dataType: "json",
  success: function (response) {
    console.log("Request completed successfully!");
  },
  error: function (response) {
    console.log("Request failed!");
  }
});
```

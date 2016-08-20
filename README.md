# pQuery
A recreation of the most important jQuery functionality, using only vanilla JavaScript and the native DOM API.

## Getting Started

To incorporate pQuery into a project, first download this repository to your local machine, or use the Git CLI to clone this repository using the following command:

```
git clone https://github.com/PSalant726/pQuery.git
```

Change working directories to the newly downloaded or cloned directory using:

```
cd pQuery
```

Then use [webpack][webpack] to bundle the component files by running the following command:

[webpack]: https://webpack.github.io

```
webpack
```

You can now include `pquery.js` in the `<head>` tag of your HTML document, like so:

```html
<head>
  <script type="text/javascript" src="[PATH TO FILE]/lib/pquery.js"></script>
</head>
```

## Core Function

$p is the Core Function of pQuery, which takes a single argument. The argument can be one of three data types: a function, a CSS selector, or an HTML element.

### Passing a Function

The function passed to the Core Function is temporarily queued in an array of functions to call upon `DOMContentLoaded`. pQuery will invoke the function once the DOM loads, and after invoking any functions that have been queued previously.

```html
<head>
  <script type="text/javascript" src="./lib/pquery.js"></script>
</head>
<body>
  <script>
    const fillDiv = () => {
      $p('class-name').html("Hello World!");
    };

    $p(fillDiv);
  </script>

  <div class='class-name'></div>

</body>
```

### Passing a CSS selector

The Core Function returns an array of all HTML elements in the DOM that match the selector.

```javascript
var $divs = $p("div");
// => [<div>First div</div>, ... , <div>Last div</div>]

var $someClassNameEls = $p("someClassName");
// => [<div class="someClassName"></div>]

var $elWithId = $p("someId");
// => [<div id="someId"></div>]
```

### Passing an HTML Element

The Core Function returns a pQuery object for use with the public API.

```javascript
var $pQueryDiv = $p("<div></div>");
```

## pQuery Object API

#### addClass(className)

Adds a class to an existing DOM element. If the DOM element already has a class defined, the class is appended to the element's classes.

```javascript
var $pQueryObj = $p("<div></div>");

$pQueryObj.addClass("class-name");
// => "<div class="class-name"></div>"
```

#### append(HTMLElement)

For an array of DOM elements with `n` child elements, creates a new element or series of elements beginning with the `n + 1` position.

```javascript
var $pQueryObj = $p("<div>Parent <div>Old Child</div> </div>")

$pQueryObj.append("<div>New Child</div>");
// => "<div>Parent <div>Old Child</div> <div>New Child</div> </div>"
```

#### attr(attributeName), attr(attributeName, attributeValue)

When one argument is passed, will return the value of the argument attribute for each DOM element. When two arguments are passed, will set the value of the argument attribute to the passed value.

```javascript
var $pQueryObj = $p("<input type='text'></input>");

$pQueryObj.attr("type");
// => "text"

$pQueryObj.attr("type", "password");
// => "<input type='password'></input>"
```

#### children()

Returns an array containing the child elements of DOM element(s).

```javascript
$pQueryObj.children();
```

#### empty()

Clears the inner HTML of DOM elements(s).

```javascript
var $pQueryObj = $p("<div>Old HTML</div>")

$pQueryObj.empty();
// => "<div></div>"
```

#### find(selector)

Returns DOM elements by CSS selector.

```javascript
$pQueryObj.find("example");
// => "<div class='example'></div>"
```

#### html(), html("New HTML")

When no argument is passed, returns the inner HTML of DOM elements. When one argument is passed, sets the inner HTML of DOM elements to the passed value.

```javascript
var $pQueryObj = $p("<div>Old HTML</div>")

$pQueryObj.html();
// => "Old HTML"

$pQueryObj.html("New HTML");
//  => "<div>New HTML</div>"
```

#### off(event, callback)

Remove an event listener from DOM element(s).

```javascript
$pQueryObj.off("mouseover", function(){ console.log("Hello World!"); });
```

#### on(event, callback)

Add an event listener to DOM element(s).

```javascript
$pQueryObj.on("mouseover", function(){ console.log("Hello World!"); });
```

#### parent()

Returns the parent element of DOM element(s).

```javascript
$pQueryObj.parent();
```

#### remove()

Removes an element from the DOM.

```javascript
$pQueryObj.remove();
```

#### removeClass(className)

Removes a class from DOM element(s).

```javascript
var $pQueryObj = $p("<div class='class-name'></div>");

$pQueryObj.removeClass("class-name");
// => "<div></div>"
```

## AJAX

Utilizes the `XMLHTTPRequest` API to asynchronously send and receive data from a server. By default, the `$p.ajax` function sends a `GET` request to an empty URL, with neither a success nor an error callback included.

```javascript
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

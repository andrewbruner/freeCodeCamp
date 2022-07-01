# Data Visualization with D3

D3, or D3.js, stands for Data Driven Documents. It's a JavaScript library for creating dynamic and interactive data visualizations in the browser.

D3 is built to work with common web standards – namely HTML, CSS, and Scalable Vector Graphics (SVG).

D3 supports many different kinds of input data formats. Then, using its powerful built-in methods, you can transform those data into different charts, graphs, and maps.

In the Data Visualization with D3 courses, you'll learn how to work with data to create different charts, graphs, hover elements, and other ingredients to create dynamic and attractive data visualizations.

## Add Document Elements with D3

D3 has several methods that let you add and change elements in your document.

The `select()` method selects one element from the document. It takes an argument for the name of the element you want and returns an HTML node for the first element in the document that matches the name. Here's an example:

```javascript
const anchor = d3.select('a');
```

The above example finds the first anchor tag on the page and saves an HTML node for it in the variable `anchor`. You can use the selection with other methods. The `d3` part of the example is a reference to the D3 object, which is how you access D3 methods.

Two other useful methods are `append()` and `text()`.

The `append()` method takes an argument for the element you want to add to the document. It appends an HTML node to a selected item, and returns a handle to that node.

The `text()` method either sets the text of the selected node, or gets the current text. To set the value, you pass a string as an argument inside the parentheses of the method.

Here's an example that selects an unordered list, appends a list item, and adds text:

```javascript
d3.select('ul')
  .append('li')
  .text('Very important item');
```

D3 allows you to chain several methods together with periods to perform a number of actions in a row.

---

Use the `select` method to select the `body` tag in the document. Then `append` an `h1` tag to it, and add the text `Learning D3` into the `h1` element.

```html
<body>
  <script>
    // Add your code below this line
    d3.select('body')
      .append('h1')
      .text('Learning D3');
    // Add your code above this line
  </script>
</body>
```

## Select a Group of Elements with D3
## Work with Data in D3
## Work with Dynamic Data in D3
## Add Inline Styling to Elements
## Change Styles Based on Data
## Add Classes with D3
## Update the Height of an Element Dynamically
## Change the Presentation of a Bar Chart
## Learn About SVG in D3
## Display Shapes with SVG
## Create a Bar for Each Data Point in the Set
## Dynamically Set the Coordinates for Each Bar
## Dynamically Change the Height of Each Bar
## Invert SVG Elements
## Change the Color of an SVG Element
## Add Labels to D3 Elements
## Style D3 Labels
## Add a Hover Effect to a D3 Element
## Add a Tooltip to a D3 Element
## Create a Scatterplot with SVG Circles
## Add Attributes to the Circle Elements
## Add Labels to Scatter Plot Circles
## Create a Linear Scale with D3
## Set a Domain and a Range on a Scale
## Use the d3.max and d3.min Functions to Find Minimum and Maximum Values in a Dataset
## Use Dynamic Scales
## Use a Pre-Defined Scale to Place Elements
## Add Axes to a Visualization
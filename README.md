# D3.js Data Binding

## Prerequisites

Besides the prerequisites needed for the d3-introduction repository:

-   Understanding how D3 is used to create and manipulate SVG elements
    and attributes

-   Understanding how D3 selections and chaining syntax work

## Essentials

-   Repository from Github (Classroom) **d3-databinding**

## Starting point

Clean HTML and JavaScript file with some boilerplate.

## Preparation

Trainer:

-   Give everyone access to the repository via GitHub classroom

-   Explain what D3.js databinding entails

Participant:

-   Download repository

-   Read README.MD

-   Study the text from the provided links below if necessary

## Learning objective

Learning the essence of Data Driven Documents by binding arbitrary
datasets to selections and using that to manipulate DOM elements and
attributes. Learning the enter-update-exit pattern and using the join
functions to do it all at the same time.

## Description

The essence of D3 is of course manipulating the DOM based on changes in
data, hence the Data Driven part. 
Databinding with D3 can seem magical and maybe a bit difficult to
understand at first.
D3 will take a selection of elements and 'joins' them to the newly
supplied data, automatically generating three new selections:

-   one that adds elements corresponding to newly added data (enter
    selection)
-   one that re-orders elements corresponding to already-existing data
    (update selection)
-   and one that removes elements corresponding to data that no longer
    exists (exit selection).

All the DOM manipulation based on the data is done using these three
selections which will be the main focus of the assignments ahead.

## Result

After the assignments you will have used selections and data binding to
create, update and remove DOM elements. It may still appear a bit
magical how D3 does this, but it will become clearer when used more
often.

## Libraries

D3.js

## Materials

## Duration

Approx. 120 min

## Links
-   [https://d3js.org/](https://d3js.org/)
-   [https://observablehq.com/@dnarvaez27/understanding-enter-exit-merge-key-function](https://observablehq.com/@dnarvaez27/understanding-enter-exit-merge-key-function)
-   [http://using-d3js.com/02_04_reordering_elements.html](http://using-d3js.com/02_04_reordering_elements.html)
-   [https://observablehq.com/collection/@thetylerwolf/25-days-of-d3](https://observablehq.com/collection/@thetylerwolf/25-days-of-d3)
-   [https://github.com/d3/d3-selection/blob/v3.0.0/README.md#joining-data](https://github.com/d3/d3-selection/blob/v3.0.0/README.md#joining-data)
-   [https://bl.ocks.org/mbostock/3808218](https://bl.ocks.org/mbostock/3808218)
-   [https://github.com/d3/d3-selection/blob/v3.0.0/README.md#selection_datum](https://github.com/d3/d3-selection/blob/v3.0.0/README.md#selection_datum)
-   [https://www.intothevoid.io/data-visualization/understanding-d3-data-vs-datum](https://www.intothevoid.io/data-visualization/understanding-d3-data-vs-datum)
-   [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
-   [https://www.freecodecamp.org/news/how-to-work-with-d3-jss-general-update-pattern-8adce8d55418/](https://www.freecodecamp.org/news/how-to-work-with-d3-jss-general-update-pattern-8adce8d55418)

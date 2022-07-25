// In this repo you find out why the library is called Data Driven Documents.
// you learned how to append elements to the DOM using D3 and create a Selection object of existing elements.
// Now you will take a look at the most important core concept of working with D3,
// namely binding a dataset to a selection manipulating DOM elements with it.
// Note: remember, most of the functions that can be called on a selection object will also return the (updated) selection object.

/**
 * Create a selection of texts elements based on a dataset of months
 * and appends them to the DOM.
 */
function originalDataMonths() {
  // // TODO: 1.1 use d3.select function to get the '#months' svg element/selection
  // const svgSelection = d3.select('#months');

  // // TODO: 1.2 use the selectAll() function on the svg selection to 'select' all 'text' element inside the svg
  // // even though there are no elements inside the svg yet!
  // // inspect the result using the browser developer tools and notice that the selectAll function returned _groups with an empty NodeList inside
  // const textElements = svgSelection.selectAll('text');

  // // TODO: 1.3 use the data() function on the text element selection and pass it our predefined 'dataset'.
  // // The data() function has now extended our selection with a couple of functions and properties which you can use to determine
  // // the state of our selected DOM elements in relation to our dataset, effectively 'binding' our dataset to the text elements.
  // // inspect the result using the browser developer tools and notice that you now have
  // // - _groups with an array containing 12 'empty' elements
  // // - an _enter selection containing an array with 12 objects, which represent the elements that are in the dataset but NOT in the DOM.
  // // - an _exit selection containing an empty array, which represents the elements that are in the DOM but NOT in the dataset.
  // const dataBoundTextElements = textElements.data(dataset);

  // //TODO: 1.4 call the enter() function on selection that has been returned by the data function.
  // // you haven't actually added anything to the DOM yet, as you haven't used the append function yet.
  // // you can't use append directly on the selection that the data function returned,
  // // as you can only append the missing elements that ARE in the dataset but are not yet in the DOM.
  // // The _enter selection contains placeholders for elements that are missing in the DOM (based on index default)
  // // and can be retreived by calling the enter() function on our databound selection.
  // const enterSelection = dataBoundTextElements.enter();

  // // TODO: 1.5 add the missing text elements to the DOM using the append function and set
  // // the y and x attributes of each text element using the chaining syntax.
  // // Use a accessor function to calculate what the y must be using the index (second parameter of the accessor function) and set the y 30 pixels apart.
  // // Set the text of each element to 'hallo' using the .text() function on the selection.
  // // Note: 'text' is not an actual attribute of an svg element that you can set via attr (textContent is a property), that is why D3 provides a special .text() function to set the textContent
  // enterSelection
  //   .append('text')
  //   .attr('x', 200)
  //   .attr('y', (_d, index) => 30 * (index + 1))
  //   .text((d, _index) => `${d.label}: ${d.percentage}%`);

  // TODO: 1.6 use a accessor function for setting text of each element instead of a fixed 'hallo'.
  // The first parameter of the accessor function is now always the data item that is now bound to that element, but only if you used the data function to bind data.
  // Our data-items contain a 'label' and 'percentage' property. change the text content of the each text element to label: percentage%

  //TODO Extra: all of the steps you did above can be also be written as one chain, rewrite the code as one chain.
  d3.select('#months')
    .selectAll('text')
    .data(dataset, (d) => d.id)
    .enter()
    .append('text')
    .attr('x', 200)
    .attr('y', (_d, index) => 25 * (index + 1))
    .text((d, _index) => `${d.label}: ${d.percentage}`);

  // TODO: 2.1 now that you've appended our text elements, you can update them without having to bind again.
  // Use the d3.select function to select a text element (automatically the first).
  // Change it's text to contain a percentage sign `${d.label}: ${d.percentage}%`
  // Notice that the data-item is still available in the accessor function, even though you created a new selection.
  // This is because D3 which data-item is bound the which DOM element.
  d3.select('text')
    .text((d, _index) => `${d.label}: ${d.percentage}%`);

  // TODO: 2.2 use the selectAll function to change all texts elements to contain a percentage sign.
  // When you call functions like attr and text on a selection that has already databound items without having called enter or exit,
  // you perform those actions on the existing DOM elements (update)
  const textElementSelection = d3.select('#months')
    .selectAll('text')
    .text((d, _index) => `${d.label}: ${d.percentage}%`);
}

/**
 * Extend the existing list of months and updates the text elements based on the new dataset
 * using the enter selection.
 */
function extendedDataMonths() {
  const extendedDataset = [...dataset, { id: 13, label: 'jan2', percentage: 34 }, { id: 14, label: 'nov2', percentage: 65 }];

  // TODO: 3.1 select all text elements and use the data function on the selection again but now the extended dataset.
  // Use the enter function again and append all missing elements to the DOM using chaining syntax.
  // Add a list-item dash character before the items that you append `- ${d.label}: ${d.percentage}%`
  // Also, make the space between the new items 20 pixels instead of 25.
  // Notice that D3 joins the existing elements with the new dataset and calculates a new enter and exit array.
  // d3.select('#months')
  //   .selectAll('text')
  //   .data(extendedDataset)
  //   .enter()
  //   .append('text')
  //   .attr('x', 200)
  //   .attr('y', (_d, index) => 20 * (index + 1))
  //   .text((d, _index) => `- ${d.label}: ${d.percentage}%`);

  //TODO: 3.2 ow no, the list is all crooked now :O
  // We appended the new items with different / updated attributes than the existing elements and the existing elements stayed the same.
  // Fix the list by selecting all text elements again and set the space between y to 20 just like the new items.
  // Also add the list-item dash character to every text.
  // d3.select('#months')
  //   .selectAll('text')
  //   .attr('y', (_d, index) => 20 * (index + 1))
  //   .text((d, _index) => `- ${d.label}: ${d.percentage}%`)

  //TODO: 3.3 Selecting all the elements again to update the existing elements doesn't feel very DRY.
  // Luckily D3 has a function called merge, that merges two (related) selections into one, so let's try this again:
  // - first, remove the not so DRY code from 3.1 and 3.2 so we can start over
  // - now selectAll text elements and bind the extendedDataset again using the data function
  //   store the resulting selection in a variable called 'extendedMonthSelection'
  // - call the enter function and the rest of the chain on the extendedMonthSelection
  // - now you can add the merge function after the 'append' function that we called on the enter selection,
  //   and merge it with the existing elements by passing extendedMonthsSelection to the merge function
  // After you merged the selections, every function you call like attr and text will be executed on both the entered elements and the already existing ones.
  const extendedMonthSelection = d3.select('#months')
    .selectAll('text')
    .data(extendedDataset, (d) => d.id);

  extendedMonthSelection.enter()
    .append('text')
    .merge(extendedMonthSelection)
    .attr('x', 200)
    .attr('y', (_d, index) => 20 * (index + 1))
    .text((d, _index) => `- ${d.label}: ${d.percentage}%`);

  // Note: As you can see it is not always possible to chain everything up, because the functions return different (virtual) selections.
  // Sometimes you need to split the chain because you need to use different selections, like the already existing elements and the newly appended elements.
  // On the other hand, if you need to perform manipulations on both the appended and existing elements, a function like merge can be used.
}

/**
 * truncate existing months and updates the text elements based on the new dataset
 * using the exit selection.
 */
function truncatedDataMonths() {
  // const truncatedDataset = dataset.slice(0, 5);
  const truncatedDataset = dataset.slice(6, 9);

  //TODO: 4.1 let's remove some of our data-items and try it the other way around. 
  // The truncatedDataset only contains the first couple of data-items.
  // Select all text elements again and call the data function with the truncatedDataset.
  // Now we can get the selection of elements that need to be removed by calling the exit() function.
  // To remove elements from the DOM with D3 you call the remove() method on a selection.
  const truncatedMonthsSelection = d3.select('#months')
    .selectAll('text')
    .data(truncatedDataset, (d) => d.id);

  truncatedMonthsSelection
    .exit()
    .remove();

  truncatedMonthsSelection
    .attr('y', (_d, index) => 20 * (index + 1));


  // TODO: 4.2 change the truncatedDataset to slice 6,8.
  // Notice something weird happening?
  // The list is displaying jan, feb, ma while the truncatedDataSet contains jul, aug, sep
  // This is because D3 uses the data and elements index position to determine which item should be removed / appended
  // We could fix this by selecting every element again and chance the text, but again that's not really DRY.
  // Instead, we need a unique key for every databound element so D3 knows which data-item belongs to which element based on that key instead of index/position.
  // You can specify such a key with the second parameter of the data() function.
  // This second parameter is a accessor function which will receive the corresponding data item and returns a unique key.
  // Luckily, we have a unique identifier in our data in the form of the id property.
  // add the second parameter to every data function call we made until now and return our id property as the unique key.
  // After you've done that, the DOM should display jul, aug and sep in their original y position.

  // TODO: 4.3 move the jul, aug, sep items to the top by splitting up our chain again between data and exit.
  // Store the selection returned by data in a variable 'truncatedMonthSelection' and call the exit and remove on it in a second chain.
  // Now you can call the attr y function again on the truncatedMonthsSelection, which will only apply to the elements that stay in the DOM.
  // Again with the not so DRY code huh... we will get to that in the next assigments ;)
}

/**
 * Create another list of text elements based on the original dataset.
 * Change the dataset and update the elements in the DOM on one chain
 * using the join selection.
 */
function joinedDataMonths() {
  //TODO: 5.1 let's do it all again!
  // But now we will try and do it all in one chain using the D3 join function.
  // First, create the original list again but this time with the '#joined-months' svg as parent element.
  // Don't forget the unique identifier in the data function.
  d3.select('#joined-months')
    .selectAll('text')
    .data(dataset, (d) => d.id)
    .enter()
    .append('text')
    .attr('x', 200)
    .attr('y', (_d, index) => 25 * (index + 1))
    .text((d, _index) => `${d.label}: ${d.percentage}%`);

  //TODO: 5.2 in our updatedDataset, we have truncated items, extended items, updated existing items AND reordered existing items :O
  // To update our DOM elements, we could create three chains of code for the update, enter and exit selections.
  // but we can also use yet another D3 function called join that does it ALL.
  // The join function creates the update, enter and exit selection and uses the merge function to merge them all together again.
  // The shorthand way of using the join function receives one string parameter
  // that represents the name of the element that needs to be appended, just like the append function on a enter selection.
  // The rest (merge, update, remove, order) is done by the join function.
  // - SelectAll text elements in #joined-months and set the data to updatedDataset (don't forget the unique key)
  // use the join('text') function after the data function and finish the chain by setting x, y and text

  const updatedDataset = [
    { id: 1, label: 'jan', percentage: 25 }, { id: 2, label: 'feb', percentage: 23 },
    { id: 4, label: 'apr', percentage: 97 },
    { id: 7, label: 'jul', percentage: 58 }, { id: 8, label: 'aug', percentage: 62 },
    { id: 13, label: 'jan2', percentage: 34 }, { id: 14, label: 'nov2', percentage: 65 },
    { id: 3, label: 'ma', percentage: 44 }
  ];

  d3.select('#joined-months')
    .selectAll('text')
    .data(updatedDataset, (d) => d.id)
    // .join('text')
    .join(
      (enter) => { return enter.append('text').attr('fill', 'green') },
      (update) => { return update.attr('fill', 'blue'); },
      (exit) => { exit.attr('fill', 'red').attr('x', 100); }
    )
    .attr('x', 200)
    .attr('y', (_d, index) => 25 * (index + 1))
    .text((d, _index) => `${d.label}: ${d.percentage}%`);

  //TODO: 5.3 general update pattern inside the join function
  // The join function makes updating our DOM really clean, but what if we want to do stuff with our appended, removed and updated items?
  // Instead of a string with the name of the element that needs to be appended by the enter selection,
  // the join function also accepts three functions as parameters that respectively represent enter, update and exit.
  // Using the shorthand usage of .join('text') can also be written like
  //.join(
  // (enter) => { return enter.append('text'); },
  // (update) => { return update; },
  // (exit) => { exit.remove(); }
  // )
  // - Use the enter, update and exit functions to give elements a different color with attr 'fill'.
  // - Make appended text elements green, removed elements red (don't remove them ;)) and edited elements blue.
  // Notice that our list of elements is crooked again. This is because our y uses the index to position elements
  // but the exited data-items are removed from the merged selection after the join.
  // - To fix this visually, set the x of the exited elements to 100.
  // Note: the parameter you receive inside every join function is the enter, update or exit selection.
  // Note: notice the position of 'ma'. the join has also updated the order of elements.

  //TODO 5.4: To visualize what the heck has happened just now, uncomment the code below to display the original list besides the current one
  const originalMonthsSelection = d3.select('#joined-months').append('g')
    .selectAll('text')
    .data(dataset, (d) => d.id)
    .enter()
    .append('text')
    .attr('x', 300)
    .attr('y', (_d, index) => 20 * (index + 1))
    .text((d, _index) => `${d.label}: ${d.percentage}%`);


  //TODO 5.5: As you may have noticed, join also sorted the elements in the DOM in the order of the dataset.
  // It used the order() function to do that.
  // Note that, although the DOM elements have been sorted, the y position remains the same.
  // So you still need to set the right y value for every element after the sorting has taken placed.
  // - make a copy of the original dataset array and sort the copy by percentage value
  // - bind the sortedDataset to the originalMonthsSelection and call the order function (don't forget the key parameter)
  // - after ordering the DOM elements, update the y positions so the list is displayed in the correct order
  const sortedData = [...dataset];
  sortedData.sort((a, b) => a.percentage > b.percentage ? 1 : -1);

  originalMonthsSelection
    .data(sortedData, (d) => d.id)
    .order()
    .attr('y', (_d, index) => 20 * (index + 1));

  // Note that there is another D3 function Selection.sort() that sorts the data that is bound to the selection 
  // as well as sorting the DOM elements, but it does not sort the original dataset!
  // Usually it is better to just sort the dataset itself and then bind it with data() and use order().
  // Then your data, the selection/bound data, the DOM elements and the actually list displayed are all in the same order. 
}

/**
 * Calculating length and total percentage of our list using D3 datum();
 */
function singularDataMonth() {
  // Until now you used the data() function to bind, join and update an array of data to multiple elements in a selection.
  // There is another function called datum() that binds a single unit of data to a selection.
  // The datum function will bind the data 'as is' to each element in the selection and will do no joining nor will it provide update, enter and exit functions to the selection.
  // If you pass an array to the datum function, each element in the selection will have the same array bound to it.
  // data = plural and datum = singular.
  // Oftentimes the selection that uses datum, only contains one element.
  // Datum is mainly used with static vizualization, that does not need dynamic updates.

  //TODO: 6.1 create our original list again in #singular-months, but wrap it in a g element
  // - append a g element to the svg #singular-months
  // - add our original list created with dataset to the g element
  // Note: wrapping our list in a g element will make selecting (only) the list elements easier later on
  d3.select('#singular-months')
    .append('g')
    .selectAll('text')
    .data(dataset, (d) => d.id)
    .enter()
    .append('text')
    .attr('x', 200)
    .attr('y', (_d, index) => 25 * (index + 1))
    .text((d, _index) => `${d.label}: ${d.percentage}%`);

  // TODO: 6.2 Let's use datum to update a single element:
  // - select the #singular-months svg and then select the first text element in it (.select always selects the first)
  // - update its bound data to customDataItem using the datum function
  // - update the displayed text of the element using the text function
  // - selectAll text elements in #months and console.log the data of that selection
  // - see what happens when you use selectAll before using datum instead of select
  const customDataItem = { id: 1, label: 'januari', percentage: 40 };
  d3.select('#singular-months').select('text')
    .datum(customDataItem)
    .text((d, _index) => `${d.label}: ${d.percentage}%`);

  // const allSelection = d3.select('#months').selectAll('text')
  // console.log(allSelection.data());

  //TODO: 6.3 display the number of elements in our dataset with the use of datum
  // - append a text element to #singular-months and position it at x 20, y 20
  // - use the datum function and supply the dataset as datum for the text element
  // - use the text function to display the length of the list
  // Note: because we used datum, the list will be available as parameter 'd' in the accessor function of text
  d3.select('#singular-months')
    .append('text')
    .datum(dataset)
    .attr('x', 20)
    .attr('y', 20)
    .text((d) => `length: ${d.length}`);

  // TODO: 6.3 Add another text element that displays the total (added up) percentages of our current list with datum
  // - first, select all text elements that are inside the g element of #singular-months and store their data() in a variable
  // - append another text element to #singular-months and position it at x 20, y 40
  // - use the datum function and supply the data we got from our text elements as datum for the text element
  // - use the text function to display the sum of the percentages of all items (you can do this by using the array reduce function) 
  const currentSelectionData = d3.select('#singular-months').select('g').selectAll('text').data();
  d3.select('#singular-months')
    .append('text')
    .datum(currentSelectionData)
    .attr('x', 20)
    .attr('y', 40)
    .text((d) => `total: ${d.reduce((total, next) => total + next.percentage, 0)}%`);
}

/**
 * Create the rects of a barchart based on our dataset using D3 selection and databinding
 */
function columnDataMonths() {
  const xPadding = 6;
  const maxPercentage = Math.max(...dataset.map((d) => d.percentage));
  const rectWidth = width / dataset.length - xPadding;
  const rectHeight = (d) => d.percentage / maxPercentage * height;

  // TODO: 7.1 use D3 selection and databinding to create rects that represent a columnchart, based on the original dataset.
  // - select the #column-months svg
  // - select all rect's, bind the dataset to the selection and create the rect's
  // - use the rectWidth, rectHeight and padding to set the size and calculate the position of the rects
  d3.select('#column-months')
    .selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('fill', 'blue')
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    .attr('y', (d) => height - rectHeight(d))
    .attr('x', (d, index) => index * (rectWidth + xPadding));

  // TODO: 7.2 use the dataset, selection and databinding to add labels to the top of each rect
  // - use the same values to position the text elements but add 14 px to the y position and set the text fill to white
  d3.select('#column-months')
    .selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .attr('fill', 'white')
    .attr('y', (d) => height - rectHeight(d) + 14)
    .attr('x', (d, index) => index * (rectWidth + xPadding))
    .text((d) => `${d.label}`);

  const updatedDataset = [
    { id: 1, label: 'jan', percentage: 25 }, { id: 2, label: 'feb', percentage: 23 },
    { id: 4, label: 'apr', percentage: 97 },
    { id: 7, label: 'jul', percentage: 58 }, { id: 8, label: 'aug', percentage: 62 },
    { id: 13, label: 'jan2', percentage: 34 }, { id: 14, label: 'nov2', percentage: 65 },
    { id: 3, label: 'ma', percentage: 44 }
  ];

  // TODO: 7.3 update the columns and labels using the updatedDataset
  // - select all rect, bind the updated data and use join to merge the datasets. 
  // - set the new height, y and x (width and fill don't change)
  // - select all text and update them as well using join, x, y and text 
  d3.select('#column-months')
    .selectAll('rect')
    .data(updatedDataset)
    .join('rect')
    .attr('height', rectHeight)
    .attr('y', (d) => height - rectHeight(d))
    .attr('x', (d, index) => index * (rectWidth + xPadding))

  d3.select('#column-months')
    .selectAll('text')
    .data(updatedDataset)
    .join('text')
    .attr('y', (d) => height - rectHeight(d) + 14)
    .attr('x', (d, index) => index * (rectWidth + xPadding))
    .text((d) => `${d.label}`);


  // TODO Extra: you needed to select the rect and text element separately in order to update them with the same values for x. 
  // That's not really DRY and you can imagine more elements would need the same x positioning, like another label or a circle representing a datapoint for a line.
  // There is a way to make this dry-er and easier to update by grouping elements together with a g element and binding the data to the group.
  // We will start using this later on, but for now watch your friendly neighbourhood trainer give an example of this using the DRYing.js file :)
}



//TODO MARCEL: ook nested selections en toevoegen / verwijderen elementen in de introductie repo.kunt values in de bubbles toevoegen selectAll.append en selectAll('circle').select(text)

//###### readonly ######

function createSVGSVGElement(width, height, id) {
  // select the element you want to add our svg graphic to, our root div 
  const rootSelection = d3.select('#root');
  // append an svg element to our root element with D3
  const svgSelection = rootSelection.append('svg');

  // using chaining syntax
  svgSelection.attr('id', id)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height]);

  return svgSelection;
}

const dataset = [
  { id: 1, label: 'jan', percentage: 40 }, { id: 2, label: 'feb', percentage: 23 },
  { id: 3, label: 'ma', percentage: 44 }, { id: 4, label: 'apr', percentage: 97 },
  { id: 5, label: 'mei', percentage: 12 }, { id: 6, label: 'jun', percentage: 10 },
  { id: 7, label: 'jul', percentage: 50 }, { id: 8, label: 'aug', percentage: 60 },
  { id: 9, label: 'sep', percentage: 70 }, { id: 10, label: 'okt', percentage: 80 },
  { id: 11, label: 'nov', percentage: 90 }, { id: 12, label: 'dec', percentage: 100 }
];

const width = 400, height = 400;
const svgMonthsSelection = createSVGSVGElement(width, height, 'months');
const svgJoinedMonthsSelection = createSVGSVGElement(width, height, 'joined-months');
const svgSingularMonthsSelection = createSVGSVGElement(width, height, 'singular-months');
const svgColumnMonthsSelection = createSVGSVGElement(width, height, 'column-months');
originalDataMonths();
extendedDataMonths();
truncatedDataMonths();
joinedDataMonths();
singularDataMonth();
columnDataMonths();


//###### end readonly ######






function groupedColumnDataMonths() {
  const xPadding = 6;
  const maxPercentage = Math.max(...dataset.map((d) => d.percentage));
  const rectWidth = DRYwidth / dataset.length - xPadding;
  const rectHeight = (d) => d.percentage / maxPercentage * DRYheight;

  /**
   * first start with an svg g element (group) that can only be used to group elements, identify that group and transform a group as a whole.
   * bind the data to that g element, which will make that data available to all child elements of the group also.
   * lastly, use the x calculation to translate all children of the group to the right position
   * you can also set attributes like fill that are inherited by the child elements.
   */
  const gtjes = d3.select('#dry-column-months')
    .selectAll('g')
    .data(dataset)
    .join('g')
    .attr('fill', 'blue')
    .attr('transform', (d, index) => `translate(${index * (rectWidth + xPadding)}, 0)`);

  /* now we use nested selections to add a rect to all group elements.
  * we use  selectAll on the g selection, effectively doing selectAll('g').selectAll('rect')
  * after a selectAll, we need to bind data to generate enter, update and remove selections again.
  * This is where an often used D3 trick comes into play:
  * - since our rect selection is a nested selection of g, each nested rect selection gets scces to the datum that is bound to that g element.
  * - to generate our enter, update en remove selections for the rect we need to call data on the rect selection and supply an array to it
  * - if you call the data function with a accessor function as argument you get the datum item just like when you use the attr function
  * - again, the data function needs an array so we take our datum from the g element, wrap it in an array and return it
  * - now we have bound an array of 1 item to our nested rect selection and our enter, update and remove selections can be used.
  * We just use join and set all the attributes of each rect EXCEPT the x position because we already took care of that by translating the group.
  */
  gtjes.selectAll('rect')
    .data((d) => [d])
    .join('rect')
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    .attr('y', (d) => height - rectHeight(d))

  // We do the same with the text elements, and can do it with any number of other elements
  gtjes.selectAll('text')
    .data((d) => [d])
    .join('text')
    .attr('fill', 'white')
    .attr('y', (d) => height - rectHeight(d) + 14)
    .text((d) => `${d.label}`);

  // updating the data can be done the same as we did before by binding the new data to the g elements
  gtjes
    .data(DRYupdatedDataset)
    .join('g');

  gtjes.selectAll('rect')
    .data((d) => [d])
    .join('rect')
    .attr('height', rectHeight)
    .attr('y', (d) => height - rectHeight(d));

  gtjes.selectAll('text')
    .data((d) => [d])
    .join('text')
    .attr('y', (d) => height - rectHeight(d) + 14)
    .text((d) => `${d.label}`);

  // Instead of using three different selectAll chains, 
  // you can also update using the longer version of the join function, and this is where it gets interesting (and maybe a bit complex)
  // gtjes
  //   // update our data bound to the g elements
  //   .data(DRYupdatedDataset)
  //   .join(
  //     // don't need enter function (yet), so use default
  //     (enter) => enter.append('g'),
  //     // use custom update functions when joining
  //     (update) => {
  //       update.selectAll('rect')
  //         .data((d) => [d])
  //         .join('rect')
  //         .attr('width', rectWidth)
  //         .attr('height', rectHeight)
  //         .attr('y', (d) => height - rectHeight(d));

  //       update.selectAll('text')
  //         .data((d) => [d])
  //         .join('text')
  //         .attr('y', (d) => height - rectHeight(d) + 14)
  //         .text((d) => `${d.label}`);
  //     },
  //     // use default exit
  //     (exit) => exit.remove()
  //   );
}

/** 
 * BUT hold on! we can go even further! (don't worry if you can't follow all this yet)
 * To append the g element and child elements of rect and text, we can use almost exactly the same code!
 * This means we can condense our code into one chain that can be called to create AND update our columnchart
 */
function DRYColumnDataMonths() {
  const xPadding = 6;
  const maxPercentage = Math.max(...dataset.map((d) => d.percentage));
  const rectWidth = DRYwidth / dataset.length - xPadding;
  const rectHeight = (d) => d.percentage / maxPercentage * DRYheight;

  // because we are using the same code for enter and update, we can refactor and DRY our code.
  // drawGChildren is a function to create or update the rect and text elements nested in g element selection.
  const drawGChildren = function (selection) {
    selection.selectAll('rect')
      .data((d) => [d])
      .join('rect')
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('y', (d) => height - rectHeight(d));

    selection.selectAll('text')
      .data((d) => [d])
      .join('text')
      .attr('fill', 'white')
      .attr('y', (d) => height - rectHeight(d) + 14)
      .text((d) => `${d.label}`);

    // return selection;
  }

  // because we use custom enter and update functions and DRYed our code, we can create a re-usable chart function
  // that can be called with different datasets
  const drawColumnChart = function (data) {
    d3.select('#dry-column-months')
      .selectAll('g')
      .data(data)
      .join(
        // append the group element, call drawGChildren and pass the enter selection
        (enter) => {
          const gAppendSelection = enter.append('g');
          drawGChildren(gAppendSelection);
          return gAppendSelection;

          // return enter.append('g').call(drawGChildren);
        },
        // call drawGChildren and pass the update selection
        (update) => {
          drawGChildren(update);
          return update;

          // return update.call(drawGChildren);
        },
        (exit) => exit.remove()
      )
      // finally, set the g attributes for appended and updated group elements
      .attr('fill', 'blue')
      .attr('transform', (d, index) => `translate(${index * (rectWidth + xPadding)}, 0)`);
  }

  drawColumnChart(DRYdataset);
  drawColumnChart(DRYupdatedDataset);

  //Add a mouse listener to the column chart that changes the dataset when you click on it
  //TODO Extra: Now let's look at the DOM and see what happens when we change our dataset
  // let bool = true;
  // d3.select('#dry-column-months').on('click', () => {
  //   if (bool) {
  //     bool = false;
  //     drawColumnChart(DRYupdatedDataset);
  //   } else {
  //     bool = true;
  //     drawColumnChart(DRYdataset);
  //   }
  // });

  /**
   * The morale of the story is:
   * If you wrap elements that belong to the same group in a g element and bind the data to the group,
   * you can really DRY up your code and easily create re-usable (pieces of) charts.
   * If you don't know what the heck is going on, don't worry, you will eventually. For now it is important to realize that
   * grouping elements is important when creating charts with D3 and we will learn how to in the next repo.
   */
}


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

const DRYdataset = [
  { id: 1, label: 'jan', percentage: 40 }, { id: 2, label: 'feb', percentage: 23 },
  { id: 3, label: 'ma', percentage: 44 }, { id: 4, label: 'apr', percentage: 97 },
  { id: 5, label: 'mei', percentage: 12 }, { id: 6, label: 'jun', percentage: 10 },
  { id: 7, label: 'jul', percentage: 50 }, { id: 8, label: 'aug', percentage: 60 },
  { id: 9, label: 'sep', percentage: 70 }, { id: 10, label: 'okt', percentage: 80 },
  { id: 11, label: 'nov', percentage: 90 }, { id: 12, label: 'dec', percentage: 100 }
];
const DRYupdatedDataset = [
  { id: 1, label: 'jan', percentage: 25 }, { id: 2, label: 'feb', percentage: 23 },
  { id: 4, label: 'apr', percentage: 97 },
  { id: 7, label: 'jul', percentage: 58 }, { id: 8, label: 'aug', percentage: 62 },
  { id: 13, label: 'jan2', percentage: 34 }, { id: 14, label: 'nov2', percentage: 65 },
  { id: 3, label: 'ma', percentage: 44 }
];

const DRYwidth = 400, DRYheight = 400;
const svgDRYColumnMonthsSelection = createSVGSVGElement(width, height, 'dry-column-months');

// groupedColumnDataMonths();
DRYColumnDataMonths();

//###### end readonly ######
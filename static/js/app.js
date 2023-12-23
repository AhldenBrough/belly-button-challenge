var start_id = '940'

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function optionChanged(selectedValue) {
  // Log the selected value to the console (you can use it as needed)
  console.log('Selected Option:', selectedValue);
  createAll(selectedValue.split(' ')[1]);
}

function createAll(name) {

  var dropdown = d3.select("#selDataset");

  d3.json(url).then((data) => {
    console.log(data);

    var options = dropdown.selectAll('option').data(data.names);
    
    options.enter()
      .append('option')
      .text(function(d) { return 'Belly ' + d; });  // have to have a function here because d3 expects a function as an argument

    // in data.samples, for each sample check if the id is equal to name, if so return that specific sample
    let currentBelly = data.samples.find(sample => sample.id === name);
    let currentMetadata = data.metadata.find(sample => sample.id === parseInt(name));

    createBar(name, currentBelly);
    createBubble(name, currentBelly);
    createDemographicInfo(name, currentMetadata);
  });
}

function createBar(name, currentBelly){
    
    let trace = {
      x: currentBelly.sample_values.slice(0,10).reverse(),
      y: currentBelly.otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
      type: "bar",
      name: "bar",
      text: currentBelly.otu_labels.slice(0,10).reverse(),
      hoverinfo: 'text',
      orientation: "h"
    };

    let s = [trace];

    Plotly.newPlot("bar", s);

}

function createBubble(name, currentBelly){
    
    let trace = {
      x: currentBelly.otu_ids,
      y: currentBelly.sample_values,
      type: "scatter",
      name: "bubble",
      text: currentBelly.otu_labels,
      hoverinfo: 'text',
      mode: 'markers',
      marker: {
        size: currentBelly.sample_values.map(value => value / 2),
        color: currentBelly.sample_values,
        colorscale: 'Rainbow'
      },
    };

    let s = [trace];

    Plotly.newPlot("bubble", s);

}

function createDemographicInfo(name, currentMetadata){
  let ul = d3.select('#sample-metadata');
  console.log(currentMetadata);

  for (let key in currentMetadata) {
    if (currentMetadata.hasOwnProperty(key)) {
      ul.append('p').text(`${key}: ${currentMetadata[key]}\n`);
    }
  }
}

createAll(start_id);
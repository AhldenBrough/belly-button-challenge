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

    createBar(currentBelly);
    createBubble(currentBelly);
    createDemographicInfo(currentMetadata);
    createGauge(currentMetadata);
  });
}

function createBar(currentBelly){
    
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

function createBubble(currentBelly){
    
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

function createDemographicInfo(currentMetadata){
  let info = d3.select('#sample-metadata');
  info.selectAll("p").remove();
  console.log(currentMetadata);

  for (let key in currentMetadata) {
    if (currentMetadata.hasOwnProperty(key)) {
      info.append('p').text(`${key}: ${currentMetadata[key]}\n`);
    }
  }
}

function createGauge(currentMetadata){
  let trace = {
    type: "indicator",
    mode: "gauge+number",
    title: {
      text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
      font: {color: "black", size: 16}
    },
    value: currentMetadata.wfreq,
    gauge: {
      axis: { range: [0, 9], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "purple" },
      steps: [
        { range: [0, 1], color: "rgba(255, 0, 0, 0.7)", label: "0-1", text: "Step 1" },
        { range: [1, 2], color: "rgba(255, 165, 0, 0.7)", label: "1-2", text: "Step 2" },
        { range: [2, 3], color: "rgba(255, 255, 0, 0.7)", label: "2-3", text: "Step 3" },
        { range: [3, 4], color: "rgba(0, 128, 0, 0.7)", label: "3-4", text: "Step 4" },
        { range: [4, 5], color: "rgba(0, 0, 255, 0.7)", label: "4-5", text: "Step 5" },
        { range: [5, 6], color: "rgba(75, 0, 130, 0.7)", label: "5-6", text: "Step 6" },
        { range: [6, 7], color: "rgba(238, 130, 238, 0.7)", label: "6-7", text: "Step 7" },
        { range: [7, 8], color: "rgba(255, 20, 147, 0.7)", label: "7-8", text: "Step 8" },
        { range: [8, 9], color: "rgba(173, 216, 230, 0.7)", label: "8-9", text: "Step 9" },
      ],
      threshold: {
        line: { color: "black", width: 2 },
        thickness: 0.75,
        value: currentMetadata.wfreq
      }
    },
    
    
  }

  let s = [trace];

    Plotly.newPlot("gauge", s);
}

createAll(start_id);
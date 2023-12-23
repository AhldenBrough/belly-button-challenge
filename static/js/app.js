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

    // Update existing options with new data
    //options.text(function(d) { return d; }); // have to have a function here because d3 expects a function as an argument

    createBar(name);

  });
}

function createBar(name){
  
  d3.json(url).then((data) => {
  
    // in data.samples, for each sample check if the id is equal to name, if so return that specific sample
    let currentBelly = data.samples.find(sample => sample.id === name); 
    console.log(currentBelly);

    let trace = {
      x: currentBelly.otu_ids,
      y: currentBelly.sample_values,
      type: "bar",
      name: "bar",
      text: currentBelly.otu_labels,
      hoverinfo: 'text'
    };

  });
}



createAll(start_id);


// select the user input field
var idSelect = d3.select("#selDataset");

// select the demographic info div's ul list group
var demographicsTable = d3.select("#sample-metadata");

// select the bar chart div
var barChart = d3.select("#bar");

// select the bubble chart div
var bubbleChart = d3.select("bubble");

// select the gauge chart div
var gaugeChart = d3.select("gauge");

function init() {
  // Point to the dropdown select element
  var dropdownMenu = d3.select("#selDataset");

  // Populate the options with the sample json names
  d3.json("data/samples.json").then((data) => {
    var names = data.names;

    names.forEach((culture) => {
      dropdownMenu
        .append("option")
        .text(culture)
        .property("value", culture);
      })

    // Use this id to culture build chart plots
    var cultureInfo = names[0];
    createCharts(cultureInfo);
    populateMetaData(cultureInfo);
  });
};

// This function is called when a dropdown menu item is selected
function updatePlotly(newCulture) {
  createCharts(newCulture);
  populateMetaData(newCulture);
};

function populateMetaData(culture) {
  d3.json("data/samples.json").then((data) => {
    var metadata = data.metadata;
    console.log(metadata);

    // filter culture metadata
    var populateArray = metadata.filter(cultureObj => cultureObj.id == culture);
    var cultureReturn = populateArray[0];
    // use d3 to select the panel
    var pandelInfo = d3.select("#sample-metadata");

    // clear existing data 
    pandelInfo.html("");

    //
    Object.entries(cultureReturn).forEach(([key, value]) => {
      pandelInfo.append("h6").text(`${key}: ${value}`);
    });
  });
}

function createCharts(culture) {
  d3.json("data/samples.json").then((data) => {
    var cultureInfo = data.samples;
    var populateArray = cultureInfo.filter(cultureObj => cultureObj.id == culture);
    var cultureReturn = populateArray[0];

    var sample_values = cultureReturn.sample_values;
    var otu_ids = cultureReturn.otu_ids;
    var otu_labels = cultureReturn.otu_labels;

    // Create the horizontal bar chart
    // Sort the data by culture results descending
    // Reverse the array to accommodate Plotly's defaults
    var sortedByCulture = otu_ids.slice((0,10)).map(otuIds => `otu ${otuIds}`).reverse();
    var cultureBarData = [
      {
        y: sortedByCulture,
        x: sample_values.slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        name: "OTUs",
        type: "bar",
        orientation: "h"
      }
    ];
    var traceCulture = [cultureBarData];

    var barLayout = {
      title: "Top Ranked OTU Cultures",
      margin: {
        l:150,
        t:25
      }
    };

    Plotly.newPlot("bar", traceCulture, barLayout);

    // Create the bubble chart
    var cultureBubbleData = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
      }
    }; 

    var traceCulture2 = [cultureBubbleData];

    var bubbleLayout = {
      title: "Weighed OTUs by Frequency",
      xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble", traceCulture2, bubbleLayout);
  });
};

// Initialize dashboard
  init()


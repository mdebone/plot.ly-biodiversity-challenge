// select the test subject id
var dropdownMenu = d3.select("#selDataset");

// use d3 to select the panel
var pandelInfo = d3.select("#sample-metadata");

// use d3 to select the bar chart 
var barChart = d3.select("#bar");

// use d3 to select the bubble chart
var bubbleChart = d3.select("#bubble");

// use d3 to select the gauge chart
var gaugeChart = d3.select("#gauge");

// function to populate test subject id no and demographic info and graphs
function init() {

  // reset the data
  resetData();
    // Point to the dropdown select element
    //var dropdownMenu = d3.select("#selDataset");
  
    // Populate the options with the sample json 'names'
    d3.json("data/samples.json").then((data) => {
       
      // for each loop to get the 'names' from the json
      data.names.forEach((culture) => {
        var names = dropdownMenu.append("option");
          names.text(culture);
        });
        
      // Use this inital id to build culture chart plots
        var firstCultureInfo = dropdownMenu.property("value")
          
          // create charts with initial value
          createCharts(firstCultureInfo);

          // populate metadata with iniital value
          //populateMetaData(firstCultureInfo);
  });
};

// reset for new data
function resetData() {
  pandelInfo.html("");
  barChart.html("");
  bubbleChart.html("");
  gaugeChart.html("");
};

// populate the chart
function createCharts(culture) {
  d3.json("data/samples.json").then((data) => {
      var subjectMetadata = data.metadata.filter(cultureSubject => cultureSubject.culture == culture)[0];
      //console.log(metadata);

      // create var for wash frequency for gauge chart
      //var washfreq = subjectMetadata.washfreq;
      // filter culture metadata
      //var populateArray = metadata
      //var cultureReturn = populateArray[0];
      // use d3 to select the panel
      //var pandelInfo = d3.select("#sample-metadata");
      // clear existing data 
      //pandelInfo.html("");
      // itterate thru each key value pair in the metadata section
      Object.entries(subjectMetadata).forEach(([key, value]) => {

        var demoInfo = pandelInfo.append("ul");
        demoInfo.attr("class","list-group");

        var newDemo = demoInfo.append("li");
        newDemo.text(`${key}: ${value}`);
      });
 
      var cultureInfo = data.samples.filter(cultureInfo => cultureInfo.culture == culture)[0];
      //var populateArray = cultureInfo.;
      //var cultureReturn = populateArray;
      // these probably need to be empty lists
      var sample_values = [];
      var otu_ids = [];
      var otu_labels = [];

      // itterate thru each key value pair in the metadata section
      Object.entries(cultureInfo).forEach(([key, value]) => {
        
          switch (key) {
            case "sample_values":
              sample_values.push(value);
              break;
            case "otu_ids":
              otu_ids.push(value);
              break;
            case "otu_labels":
              otu_labels.push(value);
              break;
            // else
            default:
          }
      
      });
 
      var topTenSampleValues = sample_values[0].slice(0,10).reverse();
      var topTenOtuIds = otu_ids[0].slice(0,10).reverse();
      var topTenOtuLabels = otu_labels[0].slice(0,10).reverse();
  
      // Create the horizontal bar chart
      // Sort the data by culture results descending
      // Reverse the array to accommodate Plotly's defaults
      var sortedByCulture = topTenOtuIds.map(otuIds => `OTU ${otuIds}`);
      var cultureBarData = [
        {
          y: sortedByCulture,
          x: topTenSampleValues,
          text: topTenOtuLabels,
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
        x: otu_ids[0],
        y: sample_values[0],
        text: otu_labels[0],
        mode: 'markers',
        marker: {
          color: otu_ids[0],
          size: sample_values[0],
        }
      }; 
  
      var traceCultureBubble = [cultureBubbleData];
  
      var bubbleLayout = {
        title: "Weighed OTUs by Frequency",
        xaxis: {title: "OTU ID"}
      };
  
      Plotly.newPlot("bubble", traceCultureBubble, bubbleLayout);
  });
};

// This function is called when a dropdown menu item is selected
function updatePlotly(culture) {
      
    // reset the data on change
    resetData();
      
    // recreate the charts on change
    createCharts(culture);
      
    // repopulate the metadata on change
    //populateMetaData(culture);
};
  
// Initialize dashboard
init()
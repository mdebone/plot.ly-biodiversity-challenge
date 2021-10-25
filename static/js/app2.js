function init() {
    // Point to the dropdown select element
    var dropdownMenu = d3.select("#selDataset");
  
    // Populate the options with the sample json 'names'
    d3.json("data/samples.json").then((data) => {
      var names = data.names;
  
      names.forEach((culture) => {
        dropdownMenu
          .append("option")
          .text(culture)
          .property("value", culture);
        })
  
      // Use this id to build culture chart plots
      var cultureInfo = names[0];
      createCharts(cultureInfo);
      populateMetaData(cultureInfo);
    });
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
  
      // these probably need to be empty lists
      var sample_values = [];
      var otu_ids = [];
      var otu_labels = [];

      var topTenSampleValues = sample_values.slice(0,10).reverse();
      var topTenOtuIds = otu_ids.slice(0,10).reverse();
      var topTenOtuLabels = otu_labels.slice(0,10).reverse();
  
      // Create the horizontal bar chart
      // Sort the data by culture results descending
      // Reverse the array to accommodate Plotly's defaults
      var sortedByCulture = topTenOtuIds.map(otuIds => `OTU ${otuIds}`);
      var cultureBarData = [
        {
          y: sortedByCulture,
          x: topTenSampleValues,
          text: topTenOtuLabels,
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

    // This function is called when a dropdown menu item is selected
    function updatePlotly(newCulture) {
        createCharts(newCulture);
        populateMetaData(newCulture);
      };
  
  // Initialize dashboard
    init()
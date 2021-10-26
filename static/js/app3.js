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
    });
};
  
function createCharts(culture) {
    d3.json("data/samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(metadata);
  
      // filter culture metadata
      var populateArray = metadata.filter(cultureObj => cultureObj.id == culture);
      var cultureReturn = populateArray[0];
      // use d3 to select the panel
      var pandelInfo = d3.select("#sample-metadata");

      // create var for wash frequency for gauge chart
      var wfrq = metadata.wfrq;
  
      // clear existing data 
      pandelInfo.html("");
  
      //
      Object.entries(cultureReturn).forEach(([key, value]) => {
        pandelInfo.append("h6").text(`${key}: ${value}`);
        //      });
        //  });
        //}
          
        //function createCharts(culture) {
        //    d3.json("data/samples.json").then((data) => {
        //      var cultureInfo = data.samples;
        //      var populateArray = cultureInfo.filter(cultureObj => cultureObj.id == culture);
        //      var cultureReturn = populateArray[0];
  
      var sample_values = cultureReturn.sample_values;
      var otu_ids = cultureReturn.otu_ids;
      var otu_labels = cultureReturn.otu_labels;
  
        // Create the horizontal bar chart
        // Sort the data by culture results descending
        //var topTenSampleValues = sample_values.slice(0,10).reverse();
      var topTenOtuIds = otu_ids.slice(0,10).reverse();
        //var topTenOtuLabels = otu_labels.slice(0,10).reverse();

        // Reverse the array to accommodate Plotly's defaults 
      var sortedByCulture = topTenOtuIds.map(otuID => `OTU ${otuID}`);
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
          title: "Top Ranked OTU Cultures Found"
      }
  
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
          title: "Weighed OTUs by Frequency<br> Scrubs per Week",
          xaxis: {title: "OTU ID"}
      };
  
      Plotly.newPlot("bubble", traceCulture2, bubbleLayout);

      // Create the gauge chart
       // if wfreq has a null value, make it zero for calculating pointer later
      if (wfrq == null) {
          wfrq = 0;
      }; 
      
      var cultureGaugeData = {
          domain: { x: [0,1], y: [0,1] },
          value:  wfreq,
          type: "indicator",
          mode: "gauge",
          gauge:  {
              axis: { range: [0,9],
                    tickmode: "linear",
                    tickwidth: 1,
                    tickcolor: "red", 
                  },
                  bar: { color: "darkblue" },
                  steps: [
                    { range: [0, 1], color: "white" },
                    { range: [1, 2], color: "whitebrown" },
                    { range: [2, 3], color: "greybrown" },
                    { range: [3, 4], color: "lightbrown" },
                    { range: [4, 5], color: "brown" },
                    { range: [5, 6], color: "greenbrown" },
                    { range: [6, 7], color: "lightgreen" },
                    { range: [7, 8], color: "green" },
                    { range: [8, 9], color: "darkgreen" },
                  ],
              },
          title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
        
        };  
      
        var traceCulture3 = [cultureGaugeData];

        var gaugeLayout = {
              width: 600,
              height: 450,
              margin: { t: 100, r: 100, l: 100, b: 100 },
        };
  
        Plotly.newPlot('gauge', traceCulture3, gaugeLayout);

    });
})};

// This function is called when a dropdown menu item is selected
function updatePlotly(newCulture) {
        createCharts(newCulture);
        populateMetaData(newCulture);
};
  
// Initialize dashboard
init()
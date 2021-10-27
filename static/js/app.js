// so it begins
//var my_filter  

function init(id=940) {
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
    var cultureInfo = id;
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

    // for when the sample changes
    Object.entries(cultureReturn).forEach(([key, value]) => {
      pandelInfo.append("h6").text(`${key}: ${value}`);
    });
  });
};

function createCharts(culture) {
  d3.json("data/samples.json").then((data) => {
    var cultureInfo = data.samples;
    var populateArray = cultureInfo.filter(cultureObj => cultureObj.id == culture);
    var cultureReturn = populateArray[0];

    var sample_values = cultureReturn.sample_values;
    var otu_ids = cultureReturn.otu_ids;
    var otu_labels = cultureReturn.otu_labels;
    var wfreq = cultureReturn.wfreq;

    // Create the horizontal bar chart
    // Sort the data by culture results descending
    // Reverse the array to accommodate Plotly's defaults
    //var sortedByCulture = otu_ids.slice((0,10)).map(otuIds => `otu ${otuIds}`).reverse();
    var cultureBarData = {
        y: otu_ids.slice(0,10).map(otuIds => `OTU ${otuIds}`).reverse(),
        x: sample_values.slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        //name: "OTUs",
        type: "bar",
        orientation: "h",
      
    };
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

    // Create the Gauge Chart
    var cultureGaugeData = {
        domain: { x: [0,1], y: [0,1] },
        value:  wfreq,
        type: "indicator",
        mode: "gauge+indicator",
        gauge:  {
            axis: { range: [0,9],
                  tickmode: "linear",
                  tickwidth: 1,
                  tickcolor: "black", 
                },
            bar: { color: "black" },
            steps: [
                  { range: [0, 1], color: "rgb(255, 255, 255)" },
                  { range: [1, 2], color: "rgb(235, 235, 224)" },
                  { range: [2, 3], color: "rgb(224, 224, 209)" },
                  { range: [3, 4], color: "rgb(204, 204, 179)" },
                  { range: [4, 5], color: "rgb(173, 173, 133)" },
                  { range: [5, 6], color: "rgb(128, 128, 0)" },
                  { range: [6, 7], color: "rgb(96, 128, 0)" },
                  { range: [7, 8], color: "rgb(68, 128, 0)" },
                  { range: [8, 9], color: "rgb(34, 51, 0)" },
                ],
            },
        title: { text: "Belly Button Washing Frequency<br> Scrubs per Week", font: { size: 24 } },
      
      };  
    
      var traceCulture3 = [cultureGaugeData];

      var gaugeLayout = {
            width: 500,
            height: 300,
        };

      Plotly.newPlot("gauge", traceCulture3, gaugeLayout);


  });
};

// This function is called when a dropdown menu item is selected
function updatePlotly(newCulture) {
    createCharts(newCulture);
    populateMetaData(newCulture);
};
function changeEverything(){
    var slect = d3.select("#selDataset").property("value");
    console.log(slect);
    init(slect);
}
// d3.select("#selDataset").on("change", changeEverything);


// Initialize dashboard
init()

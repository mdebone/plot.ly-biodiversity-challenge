var data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: 420,
      title: { text: "Speed", font: { size: 24 } },
      delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "white" },
          { range: [1, 2], color: "whitebrown" },
          { range: [2, 3], color: "greybrown" },
          { range: [3, 4], color: "lightbrown" },
          { range: [4, 5], color: "brown" },
          { range: [5, 6], color: "greenbrown" },
          { range: [6, 7], color: "lightgreen" },
          { range: [7, 8], color: "green" },
          { range: [8, 9], color: "darkgreen" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490
        }
      }
    }
  ];
  
  var layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('myDiv', data, layout);
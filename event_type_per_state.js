// function init() {
//     let selector = d3.select('#selDataset');
//     let names = ['ALABAMA', 'ALASKA', 'AMERICAN SAMOA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT', 'DELAWARE', 'DISTRICT OF COLUMBIA', 'FLORIDA', 'GEORGIA', 'GUAM', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA', 'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW HAMPSHIRE', 'NEW JERSEY', 'NEW MEXICO', 'NEW YORK', 'NORTH CAROLINA', 'NORTH DAKOTA', 'OHIO', 'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'PUERTO RICO', 'RHODE ISLAND', 'SOUTH CAROLINA', 'SOUTH DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGIN ISLANDS', 'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA', 'WISCONSIN', 'WYOMING'];
  
//     names.forEach(function(sample) {
//       selector.append("option")
//         .text(sample)
//         .property("value", sample);
//     });
  
//     d3.json("final_final_storm.json").then(function(data) {
//       console.log(data[0].STATE);
//       optionChanged(data[0].STATE); // Call optionChanged with initial state
//     });
//   }
  
//   function optionChanged(item) {
//     console.log(item);
//     barChart(item);
//   }
  
//   function barChart(selectedState) {
//     d3.json("final_final_storm.json").then(function(data) {
//       // Process the data and create Plotly plot
//       const eventTypesByState = {};
  
//       // Count event types per state
//       for (const entry in data) {
//         const eventType = data[entry].EVENT_TYPE;
//         const state = data[entry].STATE;
//         if (eventTypesByState[state]) {
//           if (eventTypesByState[state][eventType]) {
//             eventTypesByState[state][eventType]++;
//           } else {
//             eventTypesByState[state][eventType] = 1;
//           }
//         } else {
//           eventTypesByState[state] = { [eventType]: 1 };
//         }
//       }
  
//       // Create Plotly trace for the selected state
//       const stateData = eventTypesByState[selectedState];
//       const xValues = Object.keys(stateData);
//       const yValues = Object.values(stateData);
  
//       const trace = {
//         x: xValues,
//         y: yValues,
//         type: 'bar',
//         marker: {
//           color: '#8A2BE2'
//         }
//       };
  
//       const layout = {
//         yaxis: {
//           title: 'Total # of Events'
//         }
//       };
  
//       // Create Plotly plot with the selected state's trace
//       Plotly.newPlot('plot', [trace], layout);
//     }).catch(function(error) {
//       // Code to handle error if JSON data fails to load
//       console.error("Error loading JSON data:", error);
//     });
//   }
  
//   // Call init function to initialize the dropdown menu and initial chart
//   init();
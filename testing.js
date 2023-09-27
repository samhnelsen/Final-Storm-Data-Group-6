  var myMap = null;

  function init () {
    let selector = d3.select('#selDataset');
    let names = ['ALABAMA',
    'ALASKA',
    'AMERICAN SAMOA',
    'ARIZONA',
    'ARKANSAS',
    'CALIFORNIA',
    'COLORADO',
    'CONNECTICUT',
    'DELAWARE',
    'DISTRICT OF COLUMBIA',
    'FLORIDA',
    'GEORGIA',
    'GUAM',
    'HAWAII',
    'IDAHO',
    'ILLINOIS',
    'INDIANA',
    'IOWA',
    'KANSAS',
    'KENTUCKY',
    'LOUISIANA',
    'MAINE',
    'MARYLAND',
    'MASSACHUSETTS',
    'MICHIGAN',
    'MINNESOTA',
    'MISSISSIPPI',
    'MISSOURI',
    'MONTANA',
    'NEBRASKA',
    'NEVADA',
    'NEW HAMPSHIRE',
    'NEW JERSEY',
    'NEW MEXICO',
    'NEW YORK',
    'NORTH CAROLINA',
    'NORTH DAKOTA',
    'OHIO',
    'OKLAHOMA',
    'OREGON',
    'PENNSYLVANIA',
    'PUERTO RICO',
    'RHODE ISLAND',
    'SOUTH CAROLINA',
    'SOUTH DAKOTA',
    'TENNESSEE',
    'TEXAS', 'UTAH', 'VERMONT', 'VIRGIN ISLANDS', 'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA', 'WISCONSIN',  'WYOMING'];
    names.forEach(function(sample) {
      selector.append("option")
      .text(sample)
      .property("value",sample)
    });
    }

function optionChanged(item) {
      geo_chart(item);
      barChart(item);
      propertyDamageChart(item);
  }
function geo_chart(item) {
    d3.json("final_final_storm.json").then(function (data) {
    //console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function.
  let storm_values = Object.values(data);
  let sampler = storm_values.filter(sample_res => (sample_res.STATE == item));
  console.log(sampler)
  createFeatures(sampler);

});
}
function createFeatures(stormData) {

  

  // Send our earthquakes layer to the createMap function/
  createMap(stormData);
}
function createMap(stormData) {


    let stormarrows = [];
    //loop through dataset and add lines
    for(let i = 0; i < stormData.length; i++) {
        
        var latlngs = [[stormData[i].BEGIN_LAT, stormData[i].BEGIN_LON],
                       [stormData[i].END_LAT, stormData[i].END_LON]];
        stormarrows.push(L.polyline(latlngs, {color: 'red'}).arrowheads().bindPopup(stormData[i].EVENT_NARRATIVE));               
    }

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
  let stormLayer = L.layerGroup(stormarrows);
  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topography": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Storms: stormLayer
  };

  
  if(myMap != null){
    console.log("map already there!");
    myMap.remove();
  }
  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, stormLayer]
  });

  

  //myMap.fitBounds(polyline.getBounds());

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

function barChart(selectedState) {
  d3.json("final_final_storm.json").then(function(data) {
    // Process the data and create Plotly plot
    const eventTypesByState = {};

    // Count event types per state
    for (const entry in data) {
      const eventType = data[entry].EVENT_TYPE;
      const state = data[entry].STATE;
      if (eventTypesByState[state]) {
        if (eventTypesByState[state][eventType]) {
          eventTypesByState[state][eventType]++;
        } else {
          eventTypesByState[state][eventType] = 1;
        }
      } else {
        eventTypesByState[state] = { [eventType]: 1 };
      }
    }

    // Create Plotly trace for the selected state
    const stateData = eventTypesByState[selectedState];
    const xValues = Object.keys(stateData);
    const yValues = Object.values(stateData);

    const trace = {
      x: xValues,
      y: yValues,
      type: 'bar',
      marker: {
        color: '#8A2BE2'
      }
    };

    const layout = {
      yaxis: {
        title: 'Total # of Events'
      }
    };

    // Create Plotly plot with the selected state's trace
    Plotly.newPlot('plot', [trace], layout);
  }).catch(function(error) {
    // Code to handle error if JSON data fails to load
    console.error("Error loading JSON data:", error);
  });
}
function processPropertyDamage(propertyDamageString) {
  if (!propertyDamageString || propertyDamageString.trim() === "") {
      return 0;
    }
  // Remove "k" or "K" and commas from the string
  const cleanedString = propertyDamageString.replace(/[kK,.]/g, '');


  const propertyDamageFloat = parseFloat(cleanedString);


  if (propertyDamageString.includes('K') || propertyDamageString.includes('k')) {
    return propertyDamageFloat * 10;
  }


  return propertyDamageFloat;
}


function propertyDamageChart(selectedState) {
    d3.json("final_final_storm.json").then(function (data) {
      // Process the data and create Plotly plot for property damage
      const propertyDamageByState = {};
 
      console.log(data)
      // Calculate total property damage per state
      for (const entry in data) {
        const propertyDamage = data[entry].DAMAGE_PROPERTY;
       
     
        let propertyDamageParsed = processPropertyDamage(propertyDamage);
       


       




        // Replace with your property damage field name
        const state = data[entry].STATE;
        if (state in propertyDamageByState) {
          console.log(propertyDamage);
          propertyDamageByState[state] += propertyDamageParsed;
        } else {
          propertyDamageByState[state] = propertyDamageParsed;
        }
      }
 
      // Create Plotly trace for the selected state
      const propertyDamageValues = Object.values(propertyDamageByState);
      const propertyDamageKeys = Object.keys(propertyDamageByState);
 
      const trace = {
        x: propertyDamageKeys,
        y: propertyDamageValues,
        type: 'bar',
        marker: {
          color: '#FFA500' // Use a different color for property damage
        }
      };
 
      const layout = {
        title: {
          text:'2022-2023 USA Total Storm Property damage',
          font: {
            family: 'Courier New, monospace',
            size: 24
          },
          xref: 'paper',
          x: 0.05,
        },
        autosize: false,
        width: 1200,
        height: 500,
        yaxis: {
          title: 'Total Property Damage'
        },
        xaxis: {
          tickangle: 35,
          showticklabels: true,
          type: 'category',
          dtick:1,
          tickfont: {
            family: 'Courier New, monospace',
            size: 7,
            color: '#000000'
          }
        }
      };
 
      // Create Plotly plot with the selected state's trace
      Plotly.newPlot('propertyDamagePlot', [trace], layout);
    }).catch(function (error) {
      // Code to handle error if JSON data fails to load
      console.error("Error loading JSON data:", error);
    });
  }


init();
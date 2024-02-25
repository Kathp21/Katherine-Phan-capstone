
function parseItinerary(inputString) {
  // Split the inputString into itinerary part and cost part
  const [itineraryPart, costPart] = inputString.split(/Total estimated cost:|Total cost breakdown:|Total cost estimate|Total cost:/);

  // Parse the itinerary part
  const itineraryData = itineraryPart.trim().split(/(Day \d+:)/).filter(Boolean).map((item, index, array) => {
    if (index % 2 === 0) { 
      return {
        day: item.trim(),
        activities: array[index + 1].trim().split('\n').filter(Boolean) 
      };
    }
    return null;
  }).filter(item => item);

  // Parse the cost part
  const costData = costPart && costPart.trim() ? {
    title: "Total estimated cost",
    details: costPart.trim().split('\n').filter(Boolean)
  } : {
    details: []
  };
  // Return both parts
  return {
    itineraryData,
    costData
  };
}

export default parseItinerary
function parseItinerary(inputString) {
    // Split the string into sections based on "Day X:" pattern
    const daySections = inputString.split(/(Day \d+:)/).filter(Boolean);
  
    const itineraryData = [];
  
    for (let i = 0; i < daySections.length; i += 2) {
      const day = daySections[i].trim();
      const activitiesString = daySections[i + 1];
  
      // Split activities based on newlines, filter out empty strings
      const activities = activitiesString.split('\n').filter(Boolean);
  
      itineraryData.push({ day, activities });
    }
  
    // Handle the total estimated cost, which doesn't follow the "Day X:" pattern
    const costSection = inputString.split("Total estimated cost:")[1];
    if (costSection) {
      const activities = costSection.split('\n').filter(Boolean);
      itineraryData.push({ day: "Total estimated cost", activities });
    }
  
    return itineraryData;
  }
  
  export default parseItinerary
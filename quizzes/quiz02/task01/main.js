// 1. Create your getBusinesses function here:
const getBusinesses = async (location, search_term, num_results) => {
    const rootURL = 'https://www.apitutor.org/yelp/simple/v3/businesses/search';
    const endpoint = `${rootURL}?location=${location}&term=${search_term}&limit=${num_results}`;
    const response = await fetch(endpoint);
    const jsonData = await response.json();
    console.log(`Matches for ${search_term}:`, jsonData);
 };








// 2. When you're done, uncomment the test code below and preview index.html in your browser:


console.log(
    "Should display 3 pizza restaurants in Asheville:",
    getBusinesses("Asheville, NC", "pizza", 3)
);
console.log(
    "Should display 10 thai restaurants in San Francisco:",
    getBusinesses("San Francisco, CS", "thai", 10)
);


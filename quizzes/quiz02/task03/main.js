// your code here:
const getBusinesses = async (location, search_term) => {
    const rootURL = 'https://www.apitutor.org/yelp/simple/v3/businesses/search';
    const endpoint = `${rootURL}?location=${location}&term=${search_term}&limit=10`;
    const response = await fetch(endpoint);
    const jsonData = await response.json();
    console.log(`Matches for ${search_term}:`, jsonData);
 };

const search = (ev) => {
    ev.preventDefault(); // overrides default button action
  
    // Get user's preferences:
    const searchTerm = document.querySelector("#search_term").value;
    const location = document.querySelector("#location").value;
    const openOnly = document.querySelector("#is_open").checked;
  
    
    showData(searchTerm, location, openOnly);
  };
  

  const filterOpenNow = (restaurant) => {

    return true;
  };
  
  
  const filterTermMatched = (restaurant) => {
   
    return true;
  };

  const filterLocation =(restaurant) => {
    return true;
  };
  
  
  const dataToHTML = (restaurant) => {
    
    return `
    <section class="restaurant">
    <h2>${business}</h2>
    <img class ="image" src="${image_url}" alt="${business}"/>
    <p>${display_address}</p>
    <table>
        <tr>
            <td>Price</td>
            <td>${price}</td>
        </tr>
            
        <tr>
            <td>Rating</td>
            <td>${rating}</td>
        </tr>

        <tr>
            <td>Number of Reviews</td>
            <td>${review_count}</td>
        </tr>
    </table>
</section> 
  
      `;
  };
  
  const addRestaurantToDOM = (restaurant) => {
    const htmlSnippet = dataToHTML(restaurant);
    const containerEl = document.querySelector(".restaurants");
    containerEl.innerHTML += htmlSnippet;
  };
  




  // Part 2
  const showData = (searchTerm, location, openOnly) => {
    console.log(searchTerm, location, openOnly);
    console.log(rootURL);
  
    const searchTermMatch = (restaurant) => {
      if (business.toLowerCase().includes(business.toLowerCase())) {
        return true;
      }
      return false;
    };

    const locationMatch = (restaurant) => {
        if (location.toLowerCase().includes(location.toLowerCase())) {
          return true;
        }
        return false;
      };
  
    const openRestaurantsOnly = (restaurant) => {
      if (openOnly.Open) {
          return true;
      }
      return false;
    }
    let matchedRestaurants = rootURL.filter(searchTermMatch);
    if (openOnly) {
     matchedRestaurants = matchedRestaurants.filter(openRestaurantsOnly)
    }
    const containerEl = document.querySelector(".resturants");
    containerEl.innerHTML = "";
      matchedRestaurants.forEach(addRestaurantToDOM);
    
  };
  // I am not sure why the program is not working. I worked on it for a while and cant figure it out. EVerything that I tried broke the code more.
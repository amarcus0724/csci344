// https://www.apitutor.org/spotify/simple/v1/search?q=beyonce&type=track&limit=5

/** 1. Write an asynchronous function that accepts two arguments...
 *       - A search term
 *       - The number of results

 *
 * Your function will then query Spotify based on the arguments provided and
 * returns a list of data matching the search criteria.
 *
 *
 *  2. Write a function that accepts a JavaScript "track" object and returns an
 *     HTML representation of this object
 *
 *  3. Wire up the functiontality that you made to an HTML search form. When
 *     the user types in a search term and clicks the submit button, your form
 *     should show a list of the matching tracks.
 *
 */
 async function spotifySearch(searchTerm, limit) {
    const url = `https://www.apitutor.org/spotify/simple/v1/search?q=${searchTerm}&type=track&${limit}`
    console.log(url);
    const response = await fetch(url);
    const data = await response.jason();
    console.log(data);
    return data;
 }
 async function tester(){ 
   const resultsBeyonce = await spotifySearch("beyonce", 10);
   const resultsBob = await  spotifySearch("bob dylan", 5);
   
}


 function generateHtml(trackObj) {
    return `<section>
    ${trackObj.name}
    <img src="${trackObj.album.image_url}"/>
    </section>`;
 }

 
// Part 1: Set up the helper functions:
// 1. Implement two filter functions (which should return either true or false):
//      * filterClassFull: to filter out the closed courses (if applicable)
//      * filterTermMatched: to only match courses relevant to the search term
// 2. Implement the dataToHTML function, which takes a course object as an
//    argument and returns an HTML string that represents the course.

// Part 2: Within the showData function, use the array's filter, map, join
//         methods, and any relevant DOM methods, to build the interface.
// 1. Use the array's built in "filter" method, which takes a filter
//    function as an argument and returns an array of objects that
//    match the criteria.
//          * Note that you can chain filter functions together.
// 2. Use the array's built in "map" method to generate an array of
//    HTML strings.
// 3. Join the array of strings on the empty string or new line character
//    to create one large HTML string.
// 4. Clear out the existing courses in the DOM and insert
//    the HTML string into the DOM.

const search = (ev) => {
  ev.preventDefault(); // overrides default button action

  // Get user's preferences:
  const searchTerm = document.querySelector("#search_term").value;
  const openOnly = document.querySelector("#is_open").checked;

  // Pass the user's preferences into the showData function
  showData(searchTerm, openOnly);
};

// Part 1.1a
const filterClassFull = (course) => {
  // modify this
  return true;
};

// Part 1.1b
const filterTermMatched = (course) => {
  // modify this
  return true;
};

// Part 1.2
const dataToHTML = (course) => {
  // modify this
  return `
    <section class="course">
    <h2>${course.Code}: ${course.Title}</h2>
    <p>
        
        ${course.Classification.Open} &bull; 10498 &bull; Number on Waitlist 0
    </p>
    <p>
    ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)  
    
    </p>
    <p><strong>Sarris, Michael</strong></p>

</section>

    `;
};

const addCourseToDOM = (course) => {
  const htmlSnippet = dataToHTML(course);
  const containerEl = document.querySelector(".courses");
  containerEl.innerHTML += htmlSnippet;
};

// Part 2
const showData = (searchTerm, openOnly) => {
  console.log(searchTerm, openOnly);
  console.log(data); // imported from course-data.js
  // Your code here: goal: output every course to the screen
  // 1 generate an html smippet of course
  // 2 insert snippet to the DOM

  const searchTermMatch = (course) => {
    if (course.Title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    return false;
  };

  const openClassesOnly = (course) => {
    if (course.Classification.Open) {
        return true;
    }
    return false;
  }
  let matchedCourses = data.filter(searchTermMatch);
  if (openOnly) {
   matchedCourses = matchedCourses.filter(openClassesOnly)
  }
  const containerEl = document.querySelector(".courses");
  containerEl.innerHTML = "";
    matchedCourses.forEach(addCourseToDOM);
  //data.filter(searchTermMatch).forEach(addCourseToDOM);
};

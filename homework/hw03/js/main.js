import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "abigail";
let password = "password";

async function initializeScreen() {
  token = await getToken();
  showNav();
  getPosts();
  getStories();
  getProfile();
  getSuggested();

}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
// Goal We want to generate our posts from data
// 1 go out to the interner and fetch all of out posts
// 2 once our posts come back we want to loop through each post, adn append each post to the correct place in our html

async function getPosts() {
  // get http response header
  const endpoint =
    "https://photo-app-secured.herokuapp.com/api/posts/?limit=10";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // get the http body
  const posts = await response.json();

  console.log(posts);
  showPosts(posts);
}

async function getStories() {
  const endpoint = "https://photo-app-secured.herokuapp.com/api/stories";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // get the http body
  const stories = await response.json();

  console.log(stories);
   showStories(stories);
}

function showStories(stories) {
  const mainEL = document.querySelector("#storypanel");
  stories.forEach((story) => {
    const template = `<div class="flex flex-col justify-center items-center">
        <img src="${story.user.thumb_url}" alt = "picture of ${story.user.username}" class="rounded-full border-4 border-gray-300" />
        <p class="text-xs text-gray-500">${story.user.username}</p>
    </div>`;
    mainEL.insertAdjacentHTML("beforeend", template);
  });
}

async function getProfile() {
    const endpoint = "https://photo-app-secured.herokuapp.com/api/profile/";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const profile = await response.json();
    console.log(profile);
    showProfile(profile);
}

function showProfile(profile){
    console.log(profile);
    const mainEL = document.querySelector("#userprofile");
    // profile.forEach((userpro) => {
      const template = `<header class="flex gap-4 items-center">
      <img src="${profile.thumb_url}" alt ="${profile.alt_text}"class="rounded-full w-16" />
      <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>
  </header>`;
      mainEL.insertAdjacentHTML("beforeend", template);
    // });

}

async function getSuggested() {
    const endpoint = "https://photo-app-secured.herokuapp.com/api/suggestions/";
    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const suggested = await response.json();
    console.log(suggested);
    showSuggested(suggested);
}

function showSuggested(suggested){
    const mainEL = document.querySelector("#foryou");
    console.log(suggested);
    suggested.forEach((suggestedFollower) => {
      const template = `<section id ="foryou" class="flex justify-between items-center mb-4 gap-2">
      <img src="${suggestedFollower.thumb_url}" alt="${suggestedFollower.username}" class="rounded-full" />
      <div class="w-[180px]">
          <p class="font-bold text-sm">${suggestedFollower.username}</p>
          <p class="text-gray-600 text-xs">suggested for you</p>
      </div>
      <button class="text-blue-600 text-sm py-2" aria-label="Follow">follow</button>
  </section>`;
      mainEL.insertAdjacentHTML("beforeend", template);
    });

}



function showPosts(posts) {
  const mainEL = document.querySelector("main");
  posts.forEach((post) => {
    const template = `
        <section class="bg-white border mb-10">
        <div class="p-4 flex justify-between">
            <h3 class="text-lg font-Comfortaa font-bold">${
              post.user.username
            }</h3>
            <button class="icon-button" aria-label="Menu" ><i class="fas fa-ellipsis-h" ></i></button>
        </div>
        <img src="${post.image_url}" alt="${
      post.alt_text
    }" width="300" height="300"
            class="w-full bg-cover">
        <div class="p-4">
          
            <div class="flex justify-between text-2xl mb-3">
                <div>
                ${getLikeButton(post)}
                
                    <button aria-label="Comment"><i class="far fa-comment"></i></button>
                    <button aria-label="Share"><i class="far fa-paper-plane"></i></button>
                </div>
                <div>
                    ${getBookmarkButton(post)}
                </div>
            </div>
           
            <p class="font-bold mb-3">${post.likes.length} like(s)</p>

            <!-- Caption from person who created the post -->
            <div class="text-sm mb-3">
                <p>
                    <strong>${post.user.username}</strong>
                    ${post.caption}
                </p>
            </div>
            
            ${showComments(post.comments)}
          
       
            <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
        </div>
        <div class="flex justify-between items-center p-3">
            <div class="flex items-center gap-3 min-w-[80%]">
                <i class="far fa-smile text-lg"></i>
               
                <input type="text" aria-label = "add a comment" id="commentInput" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
            </div>
            <button class="text-blue-600 py-2">Post</button>
        </div>
    </section>
        
        `;
    mainEL.insertAdjacentHTML("beforeend", template);
  });
}
 //    <label for="commentInput" >Add a comment</label>
function showComments(comments) {
  if (comments.length > 1) {
    const lastComment = comments[comments.length - 1];
    return `
            <button class="text-sm mb-3"> view all ${comments.length} comments </button>
            <p class="text-sm mb-3"> 
            <strong> >${lastComment.user.username} </strong> ${lastComment.text}
            </p>
        `;
  }
  if (comments.length === 1) {
    const lastComment = comments[0];
    return `<p class="text-sm mb-3"> 
        <strong> ${lastComment.user.username} </strong> ${lastComment.text}
        </p>`;
  }
  return " ";
}

function getLikeButton(post) {
 let iconClass = "far";
  if (post.current_user_like_id) {
    return `<button onclick = "deleteLike(${post.current_user_like_id})" aria-label="Delete like"> <i class = "fa-heart fa-solid text-red-700"> </i> </button>`;
    
  } else {
    return `<button onclick = " createLike(${post.id})" aria-label="Like post"> <i class =" far  fa-heart"> </i> </button>`;
// return `class = "fa-heart"`;
  }
  
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id) {
    return `<button onclick="deleteBookmark(${post.current_user_bookmark_id}) " aria-label="Delete Bookmark"> <i class = "fa-solid   fa-bookmark"> </i> </button>`;
  } else {
    return `<button onclick="createBookmark(${post.id})" aria-label="Bookmark post"> <i class = " far fa-bookmark"> </i> </button>`;
  }
}

window.createBookmark = async function (postID) {
  const postData = {
    post_id: postID,
  };

  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/bookmarks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};
window.deleteBookmark = async function (bookmarkId) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};










window.createLike = async function (postID) {
    const postData = {
      post_id: postID,
    };
  
    const response = await fetch(
      "https://photo-app-secured.herokuapp.com/api/likes/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      }
    );
    const data = await response.json();
    console.log(data);
  };
  window.deleteLike = async function (likeId) {
    const response = await fetch(
      `https://photo-app-secured.herokuapp.com/api/likes/${likeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };
// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();

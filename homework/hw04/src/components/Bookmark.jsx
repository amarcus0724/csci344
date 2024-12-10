import React, {useState} from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";


export default function Bookmark({token, bookmarkId, postId}) {
    const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);
    
    async function createBookmark() {
        const sendData= {
            post_id: postId,
        };
            
        
        

        const responseData= await postDataToServer(token,"/api/bookmarks/", sendData );
        console.log(responseData);
        setStateBookmarkId(responseData.id);
    }

    async function deleteBookmark() {
        
       
        const responseData= await deleteDataFromServer(token, "/api/bookmarks/" + stateBookmarkId );
        console.log(responseData);
        setStateBookmarkId(null);

    }
    console.log(stateBookmarkId);

    if (stateBookmarkId) {
       return (
        <button ariaLabel="Unbookmark this post" ariaChecked="true" ariaRole="toggle" onClick={deleteBookmark} ><i className="fas fa-bookmark"></i></button>
    );  
    } else {
        return (
            <button ariaLabel="Bookmark this post" ariaChecked="false" ariaRole="toggle" onClick={createBookmark}><i className="far fa-bookmark"></i></button>
        );  
    }
   
}
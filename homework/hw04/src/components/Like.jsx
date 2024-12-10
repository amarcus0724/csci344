import React, {useState} from "react";

import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function Like({token, likeId, postId}) {
    const [stateLikeId, setStateLikeId] = useState(likeId);
    async function createLike() {
        const sendData = {
            post_id: postId,
        };

        const responseData= await postDataToServer(token,"/api/likes/", sendData );
        console.log(responseData);
        setStateLikeId(responseData.id);

    }

    async function deleteLike() {
        const responseData= await deleteDataFromServer(token, "/api/likes/" + stateLikeId );
        console.log(responseData);
        setStateLikeId(null);
    }
    console.log(stateLikeId);


    if (stateLikeId) {
        return (
         <button aria-label="Unlike this post" aria-checked="true" role="toggle" onClick={deleteLike} ><i className="fas text-red-700 fa-heart"></i></button>
     );  
     } else {
         return (
             <button aria-label="Like this post" aria-checked="false" role="toggle" onClick={createLike}><i className="far fa-heart"></i></button>
         );  
         }
        }
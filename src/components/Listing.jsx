import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../shared/constants/routes.constants";
import '../styles/listing.css'

export default function Listing() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function getListing() {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            navigate("/");
            return;
        }

        try {
            // get video listing from the backend
            const response = await axios.post(SERVER_URL + "/file/myvideos", { userId });

            // Check if the response status is successful (status code 2xx)
            if (response.status === 200) {
                console.log(response.data);
                setVideos([...response.data.data] || []); // Use an empty array if data is undefined
            } else {
                // Handle non-successful response status
                console.error(`Request failed with status ${response.status}`);
            }
        } catch (error) {
            // Handle any errors that occurred during the request
            console.error("Error fetching video listing:", error);
        }
    }

    getListing();
}, [navigate]);


return (
    <div id="listing-container">
      {videos && videos.map((video, index) => 
        <div id="video-card" key={index} onClick={()=> navigate(`/video/${video._id}`)}>{video._id}</div>
      )}
      <button onClick={()=> navigate('/selectvideo')}>add new video</button>
    </div>
  );
  
}

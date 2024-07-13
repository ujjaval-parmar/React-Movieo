import React, { useEffect, useState } from 'react'
import { apiGanerator } from '../helper/apiGanerator';

const VideoPlay = ({ setPlay, playVideoId, explore}) => {

    const [videoUrl, setVideoUrl ] = useState([]);

    const getVideoUrl = async() =>{
        try {

            const response = await apiGanerator(`${explore}/${playVideoId}/videos`);
      
            const responseData = await response.json();
      
            // console.log(responseData);
      
            setVideoUrl(responseData.results)
      
      
          } catch (err) {
            console.log(err);
          }
    }

    useEffect(()=>{
        getVideoUrl();
    }, [playVideoId]);

    console.log(videoUrl);

    return (
        <section className='w-screen h-screen max-w-[100vw] max-h-[100vh]  fixed top-0 left-0  flex items-center justify-center  z-30'>

            <div className='w-full max-w-screen-lg  h-[70vh] aspect-video rounded overflow-hidden relative z-40 bg-black'>

                <div className='w-full h-full'>
                  
                    <iframe width='' height='' className='h-full w-full' src={`https://www.youtube.com/embed/${videoUrl?.length > 0 && videoUrl[0].key}`} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />

                </div>

                <button  className='w-7 h-7 text-lg absolute top-1 right-1 lg:top-2 lg:right-2 bg-red-600 p-1 rounded-full flex items-center justify-center text-white hover:scale-95 font-bold' onClick={()=> setPlay(false)}>
                    X
                </button>

            </div>


            <div className='w-full h-full fixed  inset-0 bg-neutral-700/75 z-30' onClick={()=> setPlay(false)}></div>

        </section>
    )
}

export default VideoPlay
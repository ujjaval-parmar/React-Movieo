import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { apiGanerator } from '../helper/apiGanerator';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Card from '../components/Card';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import VideoPlay from '../components/VideoPlay';

const DetailPage = () => {

  const { explore, id } = useParams();


  const { imageBaseUrl } = useSelector(state => state.movieoData);

  // console.log(explore, id);

  const [deatilData, setDetailData] = useState({});
  const [castData, setCastData] = useState([]);
  const [similarData, setSimilarData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [isImageLoading, setImageIsLoading] = useState(true);
  const [isMainImageLoading, setMainImageIsLoading] = useState(true);
  const [play, setPlay] = useState(false);
  const [playVideoId, setPlayVideoId] = useState(null);




  const director = castData?.crew?.filter(crew => crew.department === 'Directing'
  );

  const writer = castData?.crew?.filter(crew => crew.known_for_department === 'Writing'
  );

  // console.log(director)


  const getDeatailData = async () => {
    try {

      const response = await apiGanerator(`${explore}/${id}`);

      const responseData = await response.json();

      // console.log(responseData);

      setDetailData(responseData)


    } catch (err) {
      console.log(err);
    }
  }

  const getCastData = async () => {
    try {

      const response = await apiGanerator(`${explore}/${id}/credits`);

      const responseData = await response.json();

      // console.log(responseData);
      setCastData(responseData)


    } catch (err) {
      console.log(err);
    }
  }

  const getSimilarData = async () => {
    try {

      const response = await apiGanerator(`${explore}/${id}/similar`);

      const responseData = await response.json();


      setSimilarData(responseData.results)


    } catch (err) {
      console.log(err);
    }
  }

  const getRecommended = async () => {
    try {

      const response = await apiGanerator(`${explore}/${id}/recommendations`);

      const responseData = await response.json();

      // console.log(responseData);
      setRecommendedData(responseData.results)


    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    setDetailData({ ...deatilData, backdrop_path: undefined });
    setImageIsLoading(true);
    setMainImageIsLoading(true);
    getDeatailData();
    getCastData();
    getSimilarData();
    getRecommended();
    window.scrollTo(0, 0);

  }, [explore, id]);


  if (Object.keys(deatilData).length) {

    // console.log(deatilData);
  }


  const handleImageLoad = e => {
    setImageIsLoading(false)
  }

  const handleMainImageLoad = e => {
    setMainImageIsLoading(false);
  }

  return (
    <div className='min-h-screen relative'>

      {Object.keys(deatilData).length &&
        <>

          {/* Main Bg Image */}
          <div className='w-full h-[320px]'>
            <div className='w-full h-full relative'>

              <img src={!isMainImageLoading ? imageBaseUrl + 'w1280' + deatilData?.backdrop_path : '/loading.gif'} alt={deatilData?.title || deatilData?.name} className=' w-full h-full object-cover' onLoad={handleMainImageLoad} />

              <div className='bg-gradient-to-t from-neutral-900/65 to-transparent absolute inset-0'></div>

            </div>
          </div>

          {/* Main Deatils */}
          <div className='container mx-auto px-3 flex flex-col gap-4 lg:gap-10 lg:flex-row min-h-screen '>


            {/* Poster Image */}
            <div className='-mt-8 lg:-mt-28 relative min'>
              <img src={imageBaseUrl + 'w342' + deatilData?.poster_path} alt={deatilData?.title || deatilData?.name} className=' min-w-60 h-80  object-cover rounded mx-auto md:mx-0' />

              <div className='w-full max-w-60 bg-white px-3 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 hover:scale-105 shadow-md transition-all duration-500 block mb-2 text-center mx-auto sm:mx-0' onClick={() => {
                setPlayVideoId(deatilData.id);
                setPlay(true);
              }}>
                Play Now
              </div>
            </div>


            {/* Deatials Info */}
            <div className='my-4 w-full'>

              <h2 className='text-lg lg:text-3xl font-bold text-white'>{deatilData?.title || deatilData?.name}</h2>

              <p className='text-neutral-400'>{deatilData?.tagline}</p>

              <div className='w-full my-3'>

                <div className=' w-full flex items-center gap-2 lg:gap-4 py-2 border-y border-neutral-600'>
                  <p>
                    Rating: {Number(deatilData?.vote_average).toFixed(1)}
                  </p>
                  |
                  <p>
                    Review: {deatilData?.vote_count}
                  </p>
                  |
                  <p>Duration: {Math.floor(deatilData?.runtime / 60)}h {deatilData?.runtime % 60}m</p>
                </div>


              </div>


              <div className=''>
                <h2 className='text-lg font-bold text-white mb-1'>Overview:</h2>
                <p className='text-neutral-400 text-sm lg:text-base'>{deatilData?.overview}</p>

                <div className=' w-full flex items-center gap-2 lg:gap-4 py-2 border-y border-neutral-600 my-3 flex-wrap'>
                  <p>Status: {deatilData?.status}</p>
                  |
                  <p>Release Date: {moment(deatilData?.relese_date).format('LL')}</p>
                </div>

                <div className=' w-full flex items-center gap-2 lg:gap-4 py-2 pt-0 border-b border-neutral-600 my-2 flex-wrap text-sm md:text-base'>
                  <p>Budget: ${+deatilData?.budget..toLocaleString()}</p>
                  |
                  <p>Revenue : ${+deatilData?.revenue.toLocaleString()}</p>
                </div>

                <div className=' w-full  py-2 pt-0 border-b border-neutral-600 my-3  '>
                  <p><span className='text-white pr-1'>Director:</span> {director && director.length > 0 && director[0]?.name}</p>
                </div>

                <div className=' w-full  py-2 pt-0 border-b border-neutral-600 my-3  '>
                  <p><span className='text-white pr-1'>Writer:</span> {writer && writer.length > 0 && writer[0]?.name}</p>
                </div>



                <div className=' w-full  py-2 pt-0 border-b border-neutral-600 my-3  '>
                  <h2 className='text-lg font-bold text-white mb-1'>Star Cast:</h2>

                  <div className='my-6 grid grid-cols-[repeat(auto-fit,100px)] gap-x-5 gap-y-8 place-content-center'>
                    {Object.keys(castData).length ? castData.cast.map(cast => {
                      return (<div key={cast.id} className='hover:scale-105'>

                        <div className='w-full h-24 rounded-full overflow-hidden '>

                          {cast?.profile_path ? <img src={!isImageLoading ? imageBaseUrl + 'w185' + cast?.profile_path : '/loading.gif'} alt={cast?.name} className='w-full h-full object-cover' onLoad={handleImageLoad} />
                            :
                            <img src="/imageNotFound.jpg" alt="not-found" className='w-full h-full object-contain object-top' />}

                        </div>

                        <p className='text-center text-white mt-2 font-medium'>{cast?.name}</p>

                      </div>)
                    }) : <></>}
                  </div>

                </div>


              </div>


            </div>


          </div>

        </>}


      {similarData && similarData?.length > 0 && <HorizontalScrollCard data={similarData} heading={`Similar ${explore === 'tv' ? 'TV Shows' : "Movies"}`} media_type={explore} />}

      {recommendedData.length > 0 &&
        <HorizontalScrollCard data={recommendedData} heading={`Recommended ${explore === 'tv' ? 'TV Shows' : "Movies"}`} />}

      {play && <VideoPlay setPlay={setPlay} playVideoId={playVideoId} explore={explore}/>}

    </div>
  )
}

export default DetailPage

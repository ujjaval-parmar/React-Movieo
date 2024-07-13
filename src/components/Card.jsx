import moment from 'moment';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Card = ({ data, trending, index, media_type }) => {


    const { imageBaseUrl } = useSelector(state => state.movieoData);

    const [isImageLoading, setImageIsLoading] = useState(true);


    const mediaType = data.media_type || media_type;


    const handleImageLoad = e => {
        setImageIsLoading(false)
    }

    return (
        <NavLink to={`/${mediaType}/` + data.id} className='w-full max-w-[300px] mx-auto h-80 flex items-center justify-center relative hover:scale-95 transition-all z-10'>

            {data?.poster_path ?
                <img src={!isImageLoading ? imageBaseUrl + 'w342' + data?.poster_path : '/loading.gif'} alt={data?.title || data?.name} className='w-full h-full object-cover object-center' onLoad={handleImageLoad} /> :
                <img src="/imageNotFound.jpg" alt="not-found" className='w-full h-full object-contain object-top' />
            }

            {trending && <div className=' absolute top-4 left-0 backdrop-blur-3xl bg-black/40 text-white px-3 pl-2 py-1 rounded-r-full overflow-hidden'>

                <div>
                    #{index} Trending
                </div>

            </div>}

            <div className='absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/40 py-1 pl-1'>

                <h2 className='text-lg line-clamp-1 font-semibold'>{data?.title || data?.name}</h2>

                <div className='text-sm text-neutral-400 w-full flex items-center justify-between px-0.5 '>
                    <p>{moment(data.release_date).format('LL')}</p>

                    {data.vote_average && <p className='bg-black/50 text-white px-2 py-0.5 rounded-full '>Rating: {Number(data?.vote_average).toFixed(1)} </p>}
                </div>


            </div>



        </NavLink>
    )
}

export default Card
import React from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css/navigation';


import { Navigation, Autoplay } from 'swiper/modules';
import { NavLink } from 'react-router-dom';

const BannerHome = () => {

    const { bannerData, imageBaseUrl } = useSelector(state => state.movieoData);

    // console.log('bannerData: ', bannerData);


    return (
        <section className='w-full h-full  '>

            {bannerData.length > 0 && <Swiper

                modules={[Navigation, Autoplay]}
                navigation={true}
                loop={true}
                autoplay={true}
                lazy='true'

                className='h-full max-h-[95vh]  bannerSwiper'

            >

                {bannerData.map(data => {
                    return (
                        <SwiperSlide key={data.id} className='w-full  min-h-[450px]   lg:max-h-[95vh] relative'>

                            <div className='w-full h-full relative'>
                                <img src={imageBaseUrl + 'original' + data.backdrop_path} alt=""
                                    loading="lazy" className='w-full min-h-[450px] object-cover' />
                                <div className="swiper-lazy-preloader swiper-lazy-preloader-white absolute top-72 left-[50%]"></div>
                            </div>

                            <div className='absolute inset-0 bg-gradient-to-t from-neutral-800/75 to-transparent  '>

                            </div>

                            <div className='container mx-auto w-full  absolute bottom-0 md:left-10'>
                                <div className='max-w-lg px-3 pb-2'>

                                    <h2 className='font-bold text-xl lg:text-5xl text-white drop-shadow-2xl'>{data.title || data.name}</h2>

                                    <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>

                                    <div className='flex gap-4'>
                                        <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
                                        {data.release_date && (
                                            <>
                                                <span>|</span>
                                                <p>'Relese Date: {data.release_date}</p>
                                            </>)}
                                    </div>

                                    <NavLink to={`/${data.media_type}/${data.id}`} className='bg-white px-3 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 hover:scale-105 shadow-md transition-all duration-500 block w-24 mb-2'>
                                        Play Now
                                    </NavLink>


                                </div>
                            </div>


                        </SwiperSlide>
                    )
                })}



            </Swiper>}






        </section>
    )
}

export default BannerHome
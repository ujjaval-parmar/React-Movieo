import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import 'swiper/css/navigation';
import 'swiper/css/free-mode';


import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import Card from './Card';

const HorizontalScrollCard = ({ data, heading, trending, media_type}) => {
    return (

        data.length > 0 ? <div className='container mx-auto px-3 my-10 relative z-10'>
            <h2 className='text-xl lg:text-2xl font-bold my-4 text-white'>{heading}</h2>

            <Swiper

                modules={[Navigation, FreeMode]}
                navigation={true}
                // loop={true}
                freeMode={true}
                slidesPerView={1}


                breakpoints={{
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 20


                    },
                    600: {
                        slidesPerView: 3,
                        spaceBetween: 20

                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 20

                    },
                    1280: {
                        slidesPerView: 5,
                        spaceBetween: 20

                    },
                }}



                className='cardSwiper relative z-10'>

                {data.map((movie, index) => {
                    return (
                        <SwiperSlide key={movie.id} className=''>
                            <Card data={movie} index={index + 1} trending={trending} media_type={media_type}/>
                        </SwiperSlide>
                    )
                })}

            </Swiper>


        </div> :

        <></>

    )
}

export default HorizontalScrollCard
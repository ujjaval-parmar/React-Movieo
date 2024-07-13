import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { apiGanerator } from '../helper/apiGanerator'
import BannerHome from '../components/BannerHome'
import Card from '../components/Card'
import { useSelector } from 'react-redux'


import HorizontalScrollCard from '../components/HorizontalScrollCard'



const HomePage = () => {

  const trendingMovies = useSelector(state => state.movieoData.bannerData);

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upComing, setUpComing] = useState([]);


  const getNowPlayingMovies = async () => {

    try {

      const response = await apiGanerator('movie/now_playing');

      const responseData = await response.json();

      // console.log(responseData)
      setNowPlayingMovies(responseData.results)


    } catch (err) {
      console.log(err);
    }


  }

  const getTopRatedMovies = async () => {
    try {

      const response = await apiGanerator('movie/top_rated');

      const responseData = await response.json();

      // console.log(responseData)
      setTopRatedMovies(responseData.results)


    } catch (err) {
      console.log(err);
    }
  }

  const getPopularMovies = async () => {
    try {

      const response = await apiGanerator('movie/popular');

      const responseData = await response.json();

      // console.log(responseData)
      setPopularMovies(responseData.results)


    } catch (err) {
      console.log(err);
    }
  }

  const getUpcomingMovies = async () => {
    try {

      const response = await apiGanerator('movie/upcoming');

      const responseData = await response.json();

      // console.log(responseData)
      setUpComing(responseData.results)


    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {

    getNowPlayingMovies();
    getTopRatedMovies();
    getPopularMovies();
    getUpcomingMovies();

  }, []);


  // console.log(trendingMovies);


  return (
    <div className=''>

      <BannerHome />

      <HorizontalScrollCard data={trendingMovies} heading={'Trending'} trending={true} />

      <HorizontalScrollCard data={nowPlayingMovies} heading={'Now Playing'} trending={false} media_type={'movie'}/>

      <HorizontalScrollCard data={topRatedMovies} heading={'Top Rated'} trending={false}  media_type={'movie'}/>

      <HorizontalScrollCard data={popularMovies} heading={'Popular'} trending={false}  media_type={'movie'}/>

      <HorizontalScrollCard data={upComing} heading={'Up Coming'} trending={false}  media_type={'movie'}/>

    </div>
  )
}

export default HomePage
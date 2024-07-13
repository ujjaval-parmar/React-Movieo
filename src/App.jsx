import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'
import { apiGanerator } from './helper/apiGanerator'
import { useDispatch } from 'react-redux'
import { setBannerData, setImageBaseUrl } from './store/movieoSlice'

const App = () => {

  const dispatch = useDispatch();


  const getTrandingMovies = async()=>{

    try{

      const response = await apiGanerator('trending/all/week?language=en-US');

      const responseData = await response.json();

      

      dispatch(setBannerData(responseData.results))


    }catch(err){
      console.log(err);
    }


  }

  const getConfiguration = async()=>{

    try{

      const response = await apiGanerator('configuration');

      const responseData = await response.json();

      // console.log(responseData)

      dispatch(setImageBaseUrl(responseData.images.secure_base_url
      ))


    }catch(err){
      console.log(err);
    }


  }

  useEffect(()=>{

    getTrandingMovies();

    getConfiguration();

  }, []);


  return (
    <>

      <Header />

      <main className='min-h-[calc(100vh-24px)] lg:pb-0'>
        <Outlet />
      </main>

      <Footer />

      <MobileNav />

    </>
  )
}

export default App
import React, { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { apiGanerator } from '../helper/apiGanerator';
import Card from '../components/Card';

const ExplorePage = () => {

  const { explore } = useParams();

  const [exploreData, setExploreData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);


  const loadingRef = useRef();


  const getExploreQuery = async (page = 1) => {

    try {

      const response = await apiGanerator('discover/' + explore + '?page=' + page);

      const responseData = await response.json();

      // console.log(responseData);
      setMaxPage(responseData.total_pages);

      if (page == 1) {
        setExploreData(responseData.results);
      } else {

        setExploreData([...exploreData, ...responseData.results])
      }


    } catch (err) {
      console.log(err);
    }

  }


  useEffect(() => {
    getExploreQuery();
    setPage(1);

    window.scrollTo(0, 0)


  }, [explore]);

  

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      // console.log('IN');
      if (entries[0].isIntersecting) {
        if(page>maxPage){
          return;
        }
        setPage(page + 1);
        getExploreQuery(page + 1);
      }


    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    });

    if (loadingRef.current)
      observer.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    }


  }, [exploreData]);


  return (
    <div className='container mx-auto py-20'>

      <h2 className='text-center my-5 text-3xl font-medium capitalize'>Popular {explore == 'tv' ? explore.toUpperCase() + ' Shows' : explore + 's'} </h2>

      <div className='min-h-screen grid grid-cols-[repeat(auto-fill,minmax(280px,300px))] gap-5 place-content-center'>

        {exploreData.length > 0 && exploreData.map(data => {
          return <Card data={data} key={data.id} media_type={explore}/>
        })}



      </div>

      <div className='w-full text-center' ref={loadingRef}>
        <h2 className='text-2xl font-medium text-neutral-400 my-5'>Loading......</h2>
      </div>

    </div>
  )
}

export default ExplorePage
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiGanerator } from '../helper/apiGanerator';
import Card from '../components/Card';

const SearchPage = () => {

  const [params, setParams] = useSearchParams();

  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [moreData, setMoreData] = useState(true);

  const navigate = useNavigate();


  const loadingRef = useRef();

  const searchQuery = params.get('q');

  // console.log(page, totalPage);

  const getSearchData = async () => {
    try {

      const response = await apiGanerator('search/multi?query=' + searchQuery + '&page=' + page);

      const responseData = await response.json();

      // console.log(responseData);
      setTotalPage(responseData.total_pages);


      if (page == 1) {
        setSearchData(responseData.results)
      } else {
        setSearchData([...searchData, ...responseData.results]);
      }


    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    setPage(1);
    setMoreData(true);
    setSearchData([]);

    if(searchQuery?.length>2){
      getSearchData();

    }

    if(searchQuery?.length<2){
      setSearchData([]);
    }


    window.scrollTo(0, 0);

  }, [searchQuery]);


  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {
        if (page >= totalPage) {
          setMoreData(false);
          return;
        }
        setPage(page + 1);
        getSearchData(page + 1);
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


  }, [searchData]);


  return (
    <div className='pt-16'>


      <div className='container mx-auto block lg:hidden my-5 px-2 sticky top-[68px] z-30 '>
        <input
          type="text"
          placeholder='Search Here....'
          onChange={(e) => navigate('/search?q=' + e.target.value)}
          className='px-4 py-1 text-lg w-full bg-white rounded-full outline-none text-neutral-600'
        />
      </div>



      <div className='container mx-auto min-h-screen'>

        <h2 className=' px-6 my-5 text-2xl font-medium capitalize'>
          Search Results:

          {searchQuery && searchQuery?.length < 2 &&  ' Type More than 2 characters'}

          {searchQuery &&  searchQuery?.length > 2 && searchData?.length <= 0 && ' No Result Found!'}
        </h2>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(280px,300px))] gap-5 place-content-center mb-10'>

          {searchData?.length > 0 && searchData.map(data => {
            return <Card data={data} media_type={data.media_type || 'movie'} key={data.id} />
          })}


        </div>


      </div>

      {moreData && <div className='w-full text-center' ref={loadingRef}>
        <h2 className='text-2xl font-medium text-neutral-400 my-5'>Loading......</h2>
      </div>}

    </div>
  )
}

export default SearchPage
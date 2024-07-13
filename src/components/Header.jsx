import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();
    

    const [searchInput, setSearchInput] = useState('');


    

    useEffect(() => {

        if(searchInput.length > 0){

            navigate('/search?q=' + searchInput);
        }


    }, [searchInput]);


    const handleSubmit = e => {
        e.preventDefault();

        navigate('/search?q=' + searchInput);


        return;

    }


    return (
        <header className='fixed top-0 w-full bg-neutral-600 h-16 bg-opacity-85 z-50'>

            <div className='container h-full mx-auto px-3 flex items-center  gap-6'>

                <NavLink to={'/'}>
                    <img src="/logo.png" alt="logo" width={120} />
                </NavLink>

                <nav className='hidden lg:flex items-center gap-3'>

                    <NavLink to='/tv' className='hover:text-neutral-100'>
                        TV Shows
                    </NavLink>

                    <NavLink to='/movie' className='hover:text-neutral-100'>
                        Movies
                    </NavLink>


                </nav>

                <div className='ml-auto flex items-center gap-5'>

                    <form className='flex items-center gap-2 ' onSubmit={handleSubmit} >
                        <input
                            type="text"
                            placeholder='Search here...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />

                        <button className='text-2xl text-white'>
                            <IoSearchOutline />
                        </button>
                    </form>


                    <div className='text-2xl text-white'>

                    </div>



                    <div className='w-10 h-10 cursor-pointer active:scale-75 transition-all'>
                        <img src="/user.png" alt="user" className='rounded-full' />
                    </div>

                </div>

            </div>


        </header>
    )
}

export default Header
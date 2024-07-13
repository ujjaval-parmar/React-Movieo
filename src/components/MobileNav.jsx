import React from 'react'
import { BiSolidMoviePlay } from 'react-icons/bi'
import { IoSearchOutline } from 'react-icons/io5'
import { MdHomeFilled } from 'react-icons/md'
import { PiTelevisionFill } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'

const MobileNav = () => {
    return (
        <nav className='lg:hidden w-full h-16 bg-neutral-600 bg-opacity-60 fixed -bottom-3 z-40 backdrop-blur-3xl'>

            <div className='w-full grid grid-cols-[repeat(4,1fr)] gap-1 border-b border-white  '>


                <NavLink to='/' className='hover:text-neutral-100 flex flex-col   border-collapse items-center justify-center py-0.5 border-r  border-white  '>
                    <MdHomeFilled className='text-2xl' />
                    Home
                </NavLink>

                <NavLink to='/tv' className='hover:text-neutral-100 flex flex-col   border-collapse items-center justify-center py-0.5 border-r  border-white'>
                    <PiTelevisionFill className='text-2xl' />
                    TV Shows
                </NavLink>

                <NavLink to='/movie' className='hover:text-neutral-100 flex flex-col   border-collapse items-center justify-center py-0.5 border-r  border-white'>
                    <BiSolidMoviePlay className='text-2xl' />
                    Movies
                </NavLink>

                <NavLink to='/search' className='hover:text-neutral-100 flex flex-col   border-collapse items-center justify-center py-0.5 border-r  border-white'>
                        <IoSearchOutline className='text-2xl text-white' />
                        Search
                   
                </NavLink>




            </div>



        </nav>
    )
}

export default MobileNav
// import React from 'react'
import { CgMenuGridO } from "react-icons/cg";

const Header = () => {
    return (
        <div className='flex flex-row lg:px-16 sm:px-10 px-5 py-3 text-white bg-blue-700 items-center justify-between'>
            <p className=" text-2xl font-bold">Wellness Retreats</p>

            <div className="sm:hidden flex">
                <CgMenuGridO className="text-2xl" />
            </div>
            <nav className="sm:flex hidden flex-row items-center font-medium justify-between gap-10 lg:mr-20 md:mr-10 mr-0">
                <button className="p-2 transition-colors border-b-2 border-transparent hover:border-white">Home</button>
                <button className="p-2 transition-colors border-b-2 border-transparent hover:border-white">About</button>
                <button className="p-2 transition-colors border-b-2 border-transparent hover:border-white">Contact</button>
            </nav>
        </div>
    )
}

export default Header
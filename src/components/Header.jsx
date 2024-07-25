// import React from 'react'

const Header = () => {
    return (
        <div className='flex flex-row px-16 py-3 text-white bg-blue-700 items-center justify-between'>
            <p className=" text-2xl font-bold">Wellness Retreats</p>

            <nav className="flex flex-row items-center font-medium justify-between gap-10 mr-20">
                <button className="p-2 transition-colors border-b-2 border-transparent hover:border-white">Home</button>
                <button className="p-2 transition-colors border-b-2 border-transparent hover:border-white">About</button>
                <button className="p-2 transition-colors border-b-2 border-transparent hover:border-white">Contact</button>
            </nav>
        </div>
    )
}

export default Header
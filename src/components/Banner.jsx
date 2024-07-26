// import React from 'react'
import image from '../assets/banner.jpg'

const Banner = () => {
    return (
        <div className='sm:flex hidden w-full p-6'>
            <div className='p-4 bg-blue-200 rounded-xl w-full flex flex-col gap-4'>
                <img src={image} alt="Banner" className='w-full h-96 rounded-lg object-cover' />

                <section>
                    <h1 className='text-lg font-bold'>Discover Your inner peace</h1>
                    <p>Join us for series of wellness retreats designed to help you find tranqulity and rejuvination</p>
                </section>
            </div>
        </div>
    )
}

export default Banner
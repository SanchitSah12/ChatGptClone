'use client'
import React, { useEffect } from 'react'
import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
const HomePage = () => {
    
    return (
        <div className='flex flex-col items-center justify-center h-screen text-white'>
            <h1 className='text-5xl font-bold mb-20'>ChatGPT</h1>

            <div className='flex space-x-2 text-center'>
                <div>
                    <div className='flex flex-col items-center justify-center mb-5'>
                        {/* sun icon */}
                        <SunIcon className='h-8 w-8'></SunIcon>

                        <h2>Examples</h2>

                        <div className='space-y-2'>
                            <p className='infoText'>"Explain something to me" </p>
                            <p className='infoText'>"What is the difference between a dog and a cat" </p>
                            <p className='infoText'>"What is the colour of the sun"</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col items-center justify-center mb-5'>
                        {/* sun icon */}
                        <BoltIcon className='h-8 w-8'></BoltIcon>

                        <h2>Capabilities</h2>

                        <div className='space-y-2'>
                            <p className='infoText'>Remembers what user said earlier in the conversation </p>
                            <p className='infoText'>Allows user to provide follow-up corrections</p>
                            <p className='infoText'>Trained to decline inappropriate requests</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col items-center justify-center mb-5'>
                        {/* sun icon */}
                        <ExclamationTriangleIcon className='h-8 w-8'></ExclamationTriangleIcon>

                        <h2>Limitations</h2>

                        <div className='space-y-2'>
                            <p className='infoText'>May occasionally generate incorrect information</p>
                            <p className='infoText'>May occasionally produce harmful instructions or biased content </p>
                            <p className='infoText'>Limited knowledge of world and events after 2021</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
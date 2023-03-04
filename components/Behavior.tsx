'use client'
import React from 'react'
import Select from 'react-select'
import useSwr from 'swr'

const fetchModels = () => fetch('/api/getEngines').then(res => res.json())

const Behavior = () => {
    const { data: models, isLoading } = useSwr("models", fetchModels)
    const {data:model,mutate:setModel} = useSwr('model',{
        fallbackData:'You are an helpful AI'
    })
    return (
        <div>
            <div className='border-t border-gray-900 p-3 flex'>
                <h1 className='font-bold'>System Behavior -</h1> 
                <input 
                    className='flex-1 bg-inherit border-none outline-none border-[#e1d5d521]'
                    onChange={(e) => setModel(e.target.value)} 
                    type="text" 
                    value={model}
                    />
            </div>
        </div>
    )
}

export default Behavior
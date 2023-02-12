'use client'
import React from 'react'
import Select from 'react-select'
import useSwr from 'swr'

const fetchModels = () => fetch('/api/getEngines').then(res => res.json())

const ModelSelection = () => {
    const { data: models, isLoading } = useSwr("models", fetchModels)
    const {data:model,mutate:setModel} = useSwr('model',{
        fallbackData:'text-davinci-003'
    })
    return (
        <div className='mt-2'>
            <Select className='mt-2'
                options={models?.modelOptions}
                defaultValue={model}
                placeholder={model}
                isLoading={isLoading}
                menuPosition='fixed'
                classNames={{
                    control: (state) => "bg-[#434654] border-[#434654]"
                }}
                onChange={(e)=>setModel(e.value)}
            ></Select>
        </div>
    )
}

export default ModelSelection
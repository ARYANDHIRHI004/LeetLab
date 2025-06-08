import React from 'react'

const BlurBlob = ({position, size}) => {
    const {top, left} = position
    const {width, height} = size
  return (
    <div className='absolute z-0'
    style={{
        top:top,
        left:left,
        width:width,
        height:height,
        transform:'translate(-50%, -50%)'
    }}
    >
        <div className='w-full h-full bg-blue-800 rounded-full opacity-20 blur-3xl animate-pulse text-white'>
        </div>

    </div>
  )
}

export default BlurBlob
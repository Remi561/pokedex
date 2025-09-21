import React from 'react'

const Loading = () => {
  return (
      <div className='fixed w-screen md:w-[calc(100vw-20rem)] h-screen inset-y-0 md:left-[20rem] bg-white/50 flex items-center justify-center backdrop-blur-3xl flex-col'>
          <div className='size-20 rounded-full border-primary border-3 border-b-0 border-l-0 animate-spin'></div>
          <p className='text-primary text-xl capitalize'>loading data...</p>
    </div>
  )
}

export default Loading
import React from 'react'

const NameList = ({ item,activeLink, handleActive,idx }) => {
    

  return (
      <button onClick={handleActive} className={`flex items-center gap-3 font-base hover:text-white text-base dark:text-background w-full hover:bg-base/50 hover:dark:bg-background/50 p-2 ${activeLink === item.id ? 'bg-base/50 text-background dark:bg-background/50  w-full': null}`}>
          <span>{item.id}</span>
          <p>{item.name}</p>
    </button>
  )
}

export default NameList
import React from 'react'

const SearchBar = ({word , setWord}) => {
   
  return (
      <form className='w-full bg-background border rounded-md '>
          <input type="text" value={word} onChange={(e) => setWord(e.target.value) } placeholder='search by name or ID' className='w-full border-0 outline-none p-2 placeholder:text-base dark:text-base placeholder:capitalize'/>
    </form>
  )
}

export default SearchBar
import React, { useEffect } from 'react'
import Card from './Card'
import { Names } from './Names'

const Content = ({ activeLink }) => {
    const foundItem = Names.filter(item => item.id === activeLink)
    console.log(foundItem)

    

    
  return (
      <div> 
          {foundItem.map(item => <Card key={item.id} item={item} />)}
    </div>
  )
}

export default Content
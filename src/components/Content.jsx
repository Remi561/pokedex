import React, { useEffect } from 'react'
import Card from './Card'
import { Names } from './Names'
import { FaBurger } from "react-icons/fa6";

const Content = ({ activeLink }) => {
  const foundItem = Names.filter((item) => item.id === activeLink);
  console.log(foundItem);

  return (
    <div>
      <div className="w-screen h-[50px] bg-white shadow sticky top-0 md:hidden flex items-center justify-end px-3">
        <FaBurger />
      </div>
      <div className="px-3">
        {foundItem.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Content
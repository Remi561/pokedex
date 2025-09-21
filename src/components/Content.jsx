import React, { useEffect } from 'react'
import Card from './Card'
import { Names } from './Names'
import { FiMenu } from "react-icons/fi";

const Content = ({ activeLink, setIsToggle, isToggle }) => {
  const foundItem = Names.filter((item) => item.id === activeLink);

  return (
    <div>
      <div className="w-screen h-[50px] bg-white shadow sticky top-0 z-40 sm:hidden flex items-center justify-end px-3 dark:bg-dark-bg dark:shadow-2xs">
        <button onClick={() => setIsToggle(true)}>
          <FiMenu className="dark:text-white text-2xl" />
        </button>
      </div>
      <div className="px-3 ">
        {foundItem.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Content
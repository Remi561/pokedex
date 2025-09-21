import React from 'react'
import SearchBar from './SearchBar'
import NameList from './NameList'
import { Names } from './Names'
import { FaSun, FaTimes, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({
  activeLink,
  setActiveLink,
  setIsToggle,
  toggleTheme,
  darkMode,
}) => {
  const [word, setWord] = React.useState("");

  const FilteredNames = Names.filter(
    (item) =>
      item.id.includes(word) ||
      item.name.toLowerCase().includes(word.toLowerCase()),
  );

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <header className="text-5xl font-bold font-luckiest text-primary">
          Pokedex
        </header>
        <button className="sm:hidden" onClick={() => setIsToggle(false)}>
          <FaTimes className="dark:text-white" />
        </button>
      </div>

      <SearchBar word={word} setWord={setWord} />
      <div className="flex-1 overflow-y-auto w-full space-y-2 py-4">
        {FilteredNames.length ? (
          FilteredNames.map((item, idx) => (
            <NameList
              item={item}
              key={idx}
              handleActive={() => setActiveLink(item.id)}
              activeLink={activeLink}
              idx={idx}
            />
          ))
        ) : (
          <p className="text-center text-xl">
            No <span className="font-sans">'{word}'</span> found
          </p>
        )}
      </div>
      <button onClick={toggleTheme} className="self-end text-xl">
        {darkMode ? <FaMoon className="dark:text-white" /> : <FaSun />}
      </button>
    </>
  );
};

export default Sidebar
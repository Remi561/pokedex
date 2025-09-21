import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content';



function App() {
  const [darkMode, setDarkMode] = useState(false)

  const [activeLink, setActiveLink] = useState('001');
  

  return (
    <>
      <section className="flex items-center gap-10">
        <div className="fixed h-screen md:max-w-xs bg-white -left-[50rem] w-full top-0  md:left-0 flex items-baseline gap-5 px-3 py-5 flex-col dark:bg-base dark:text-background shadow-2xl z-20 ">
          <Sidebar
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
          />
        </div>
        <div className="relative md:w-[calc(100vw-20rem)] min-h-screen md:left-[20rem] w-screen left-0 ">
          <Content activeLink={activeLink} />
        </div>
      </section>
    </>
  );
}

export default App

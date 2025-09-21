import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Content from './components/Content';
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On mount, check saved theme or system preference
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDarkMode(saved === "dark");
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const [activeLink, setActiveLink] = useState("001");
  const [isToggle, setIsToggle] = useState(false);

  return (
    <>
      <section
        className={`flex items-center gap-10 ${isToggle && "overflow-x-hidden"} `}
      >
        <div
          className={`fixed h-screen sm:max-w-xs bg-white sm:w-full top-0  sm:left-0 sm:flex items-baseline gap-5 px-3 py-5 hidden sm:flex-col dark:bg-dark-bg transition-all duration-500`}
        >
          <Sidebar
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            isToggle={isToggle}
            setIsToggle={setIsToggle}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            toggleTheme={toggleTheme}
          />
        </div>
        <AnimatePresence>
          {isToggle && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }} // ✅ slides out when removed
              transition={{ type: "tween", duration: 0.4 }}
              className={`sm:hidden max-w-[90vw] w-full fixed h-screen top-0 left-0 flex flex-col gap-5 px-3 py-5 z-50 dark:bg-dark-bg transition-colors duration-500`}
            >
              <Sidebar
                setDarkMode={setDarkMode}
                darkMode={darkMode}
                isToggle={isToggle}
                setIsToggle={setIsToggle}
                activeLink={activeLink}
                setActiveLink={setActiveLink}
                toggleTheme={toggleTheme}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isToggle ? "90vw" : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`relative sm:w-[calc(100vw-20rem)] min-h-screen sm:left-[20rem] w-screen left-0 ${isToggle && "w-[100vw-90vw]"} transition-colors duration-500`}
        >
          <Content
            activeLink={activeLink}
            isToggle={isToggle}
            setIsToggle={setIsToggle}
          />
        </motion.div>
      </section>
    </>
  );
}

export default App

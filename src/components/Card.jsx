import React, { useEffect, useState } from 'react'
import { easeInOut, motion } from "framer-motion";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";
import Loading from "./Loading";

const Card = ({ item }) => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const saved = JSON.parse(localStorage.getItem("pokemon")) || [];

      const found = saved.find(
        (cache) => cache.name.toLowerCase() === item.name.toLowerCase(),
      );
      if (found) {
        setPokemons(saved);

        return;
      }
      try {
        setIsLoading(true);
        const [pokeRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${item.name}`),
        ]);
        if (!pokeRes.ok || !speciesRes.ok) {
          setError("An Error occured while fetching the data");

          setIsLoading(false);
          return;
        }
        const pokeData = await pokeRes.json();
        const speciesData = await speciesRes.json();

        const formatted = {
          id: pokeData.id,
          abilities: pokeData.abilities,
          cries: pokeData.cries,
          stats: pokeData.stats,
          name: pokeData.name,
          sprites: pokeData.sprites,
          moves: pokeData.moves.map((item) => item.move),
          color: speciesData.color.name,
        };
        const updated = [...saved, formatted];
        localStorage.setItem("pokemon", JSON.stringify(updated));
        setPokemons(updated);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [item.name]);

  const selectedPokemon = pokemons.filter(
    (pokeItem) => pokeItem.name.toLowerCase() === item.name.toLowerCase(),
  );

  const removeDash = (name) => {
    const item = name.replaceAll("-", " ");
    return item;
  };

  return (
    <div className={`py-5 relative `}>
      {!isLoading && error == null ? (
        <section>
          {selectedPokemon.map((selectedItem) => (
            <div key={selectedItem.id}>
              <div className="h-[50vh] bg-white/50 backdrop-blur-3xl  border-black dark:border-primary relative flex items-center justify-center ">
                <div className="absolute w-full h-full inset-0 flex items-center justify-center">
                  <div
                    className="w-50 h-50 blur-3xl rounded-full "
                    style={{
                      background: `${selectedItem.color}`,
                    }}
                  ></div>
                </div>
                <img
                  className={`w-full h-full object-contain backdrop-blur-3xl drop-shadow-2xl`}
                  src={`${selectedItem.sprites.other["dream_world"].front_default}`}
                  alt=""
                />
              </div>
              <div className="flex items-center my-5 gap-6 w-full justify-center flex-wrap shrink-0">
                {Object.values(selectedItem.sprites.other["showdown"] || {})
                  .filter((url) => url !== null)
                  .map((imgUrl, idx) => (
                    <div key={idx} className="w-30 h-30">
                      <img
                        className="border dark:border-white p-4 w-full h-full object-contain"
                        src={`${imgUrl}`}
                      />
                    </div>
                  ))}
              </div>
              <div className="my-5">
                <header className="capitalize font-base text-2xl font-bold mb-4 dark:text-white">
                  stat
                </header>
                <ul className="w-full flex flex-col gap-4">
                  {selectedItem.stats.map(({ base_stat, stat }, idx) => {
                    const percentage = Math.ceil((base_stat / 255) * 100);
                    return (
                      <li
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <p className="capitalize w-40 dark:text-white">
                          {stat.name}
                        </p>
                        :
                        <section className="w-[90%] flex items-center gap-2">
                          <div className="dark:text-white">{percentage}%</div>
                          <div className="w-full h-3 bg-gray-300 rounded-xl flex overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.3, ease: easeInOut }}
                              className={`${stat.name === "hp" ? "bg-error" : stat.name === "defense" ? "bg-primary" : "bg-green-500"}`}
                              style={{ width: `${percentage}%` }}
                            ></motion.div>
                          </div>
                        </section>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="my-5">
                <header className="capitalize font-base text-2xl font-bold mb-4 dark:text-white">
                  moves
                </header>

                <section className="flex flex-wrap shrink-0 gap-4">
                  {selectedItem.moves.slice(0, 40).map((item, idx) => (
                    <button
                      key={idx}
                      className="border rounded-lg px-2 py-1 capitalize dark:text-white dark:border-white"
                    >
                      {removeDash(item.name)}
                    </button>
                  ))}
                </section>
              </div>
            </div>
          ))}
        </section>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="flex items-center flex-col">
          <FaExclamationCircle className="text-6xl text-error " />
          <p className="text-error capitalize">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Card
import React, { useEffect, useState } from 'react'

const Card = ({ item }) => {
    
    const [pokemons, setPokemons] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
 
  

    

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

    console.log(selectedPokemon);
    console.log(isLoading);
    console.log(error);

    return (
      <div className="py-5">
        {!isLoading && error == null ? (
          <section>
            {selectedPokemon.map((selectedItem) => (
              <div key={selectedItem.id}>
                <div className="h-[50vh] bg-white/50 backdrop-blur-3xl  border relative flex items-center justify-center">
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
                    src={`${selectedItem.sprites.other["official-artwork"].front_default}`}
                    alt=""
                  />
                </div>
                <div>
                  {Object.values(
                    selectedItem.sprites.other["official-artwork"] || {},
                  )
                    .filter((url) => url !== null)
                    .map((imgUrl, idx) => (
                      <img key={idx} src={`${imgUrl}`} />
                    ))}
                </div>
              </div>
            ))}
          </section>
        ) : null}
      </div>
    );
}

export default Card
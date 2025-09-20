import React, { useEffect, useState } from 'react'

const Card = ({ item }) => {
    
    const [pokemons, setPokemons] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
 
  

    

    useEffect(() => {
        const fetchData = async () => {
           
            const saved = JSON.parse(localStorage.getItem('pokemon')) || []
            
            
            const found = saved.find(cache => cache.name.toLowerCase() === item.name.toLowerCase())
            if (found) {
                
                setPokemons(saved)
                
                return
            }
            try {
                setIsLoading(true)
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`);
                if (!res.ok) {
                    setError(`${res.status} an error occured while fetching make sure you are connected to the internet `)
                    setIsLoading(false)
                    return;
            
                } 
                const data = await res.json()
                const updated = [...saved, data]
                localStorage.setItem('pokemon', JSON.stringify(updated))
                setPokemons(updated)
            } catch (err) {
                setError(err.message)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [item.name]);
      

  
    const selectedPokemon = pokemons.filter(pokeItem => pokeItem.name.toLowerCase() === item.name.toLowerCase())

    
    console.log(selectedPokemon)
    console.log(isLoading)
    console.log(error)
    
  return (
      <div>
          {!isLoading && error == null ? (
              <section>
                  {
                      selectedPokemon.map(selectedItem => (
                          <div key={selectedItem.id}>
                              <div className=''><img className='w-full h-full object-cover' src={selectedItem.sprites.front_default} alt="" /></div>
                          </div>
                      ))
                  }
          </section>
          ):null}
      </div>
  )
}

export default Card
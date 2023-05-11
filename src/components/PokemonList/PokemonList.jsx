import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pokemon from "./Pokemon";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import './PokemonList.scss'

const PokemonList = () => {
    const [data, setData] = useState([])
    const [singlePokemon, setSinglePokemon] = useState({})
    const [loadedPokemonCount, setLoadedPokemonCount] = useState(12);
    const pokemonPerPage = 12;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=' + loadedPokemonCount);
                const pokemonData = await Promise.all(response.data.results.map(async (pokemon) => {
                    const pokemonResponse = await axios.get(pokemon.url);
                    return pokemonResponse.data;
                }));
                setData(pokemonData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [loadedPokemonCount]);

    const handleShowDetails = async (name) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonDetails = response.data;
            setSinglePokemon(pokemonDetails)
        } catch (error) {
            console.error('Error fetching pokemon data:', error);
        }
    };

    const handleLoadMore = () => {
        setLoadedPokemonCount(prevCount => prevCount + pokemonPerPage);
    };

    return (
        <section className="pokemons">
            <div className="container">
                <h1 className="pokemons__title">Pokedex</h1>
                <div className="pokemons__inner">
                    <div className="pokemons__cards">
                        {data && data.map(pokemon => (
                            <Pokemon
                                key={pokemon.id}
                                pokemonPhoto={pokemon.sprites.front_default}
                                handleShowDetails={handleShowDetails}
                                name={pokemon.name}
                                types={pokemon.types} />
                        ))}
                        <div className="button-container">
                            <button onClick={handleLoadMore} className="pokemons__load">Load more</button>
                        </div>
                    </div>
                    <PokemonDetails singlePokemon={singlePokemon} />
                </div>
            </div>
        </section>
    );
};

export default PokemonList;
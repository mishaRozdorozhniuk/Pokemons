import React from 'react';
import './Pokemon.scss'

const Pokemon = ({pokemonPhoto, name, handleShowDetails, types}) => {
    return (
        <article className="pokemon" onClick={() => handleShowDetails(name)}>
            <img src={pokemonPhoto} alt="pokemon-img"/>
            <h2 className="pokemon__name">{name}</h2>
            <div className="pokemon__types">
                {types.map(type => <span key={type.type.name} className={`pokemon__type ${type.type.name}`}>{type.type.name}</span>)}
            </div>
        </article>
    );
};

export default Pokemon;
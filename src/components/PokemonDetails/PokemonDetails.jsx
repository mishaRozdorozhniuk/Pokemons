import React from 'react';
import './PokemonDetails.scss';

const PokemonDetails = ({ singlePokemon }) => {
    const { types, stats, weight, moves, species, sprites } = singlePokemon;

    const statRows = [
        { label: 'Attack', index: 1 },
        { label: 'Defense', index: 2 },
        { label: 'HP', index: 0 },
        { label: 'SP Attack', index: 3 },
        { label: 'SP Defense', index: 4 },
        { label: 'Speed', index: 5 },
    ];

    const statTableRows = statRows.map((statRow) => (
        <tr key={statRow.label}>
            <td>{statRow.label}</td>
            <td>{stats && stats[statRow.index].base_stat}</td>
        </tr>
    ));

    return (
        <section className={Object.keys(singlePokemon).length !== 0 ? "details show" : "details"}>
            <div className="details__inner">
                <img className="details__photo" src={sprites && sprites.front_default} alt="details-image"/>
                <h2 className="details__name">{species && species.name}</h2>
                <table className="details__table">
                    <tbody>
                    <tr>
                        <td>Type</td>
                        <td>
                            {types &&
                                types.map((type) => (
                                    <span key={type.type.name} className="details__type">{type.type.name}</span>
                                ))}
                        </td>
                    </tr>
                    {statTableRows}
                    <tr>
                        <td>Weight</td>
                        <td>{weight && weight}</td>
                    </tr>
                    <tr>
                        <td>Total moves</td>
                        <td>{moves && moves.length}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default PokemonDetails;

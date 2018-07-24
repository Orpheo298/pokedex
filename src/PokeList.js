// @flow
import * as React from 'react';
import type { Pokemon } from './Pokemon';

type ThumbnailPokemonProps = {
  pokemon: Pokemon
};

const ThumbnailPokemon = (props: ThumbnailPokemonProps) => {
  return (
    <div className="thumbnail col-md-1" key={props.pokemon.id}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          props.pokemon.id
        }.png`}
        alt={props.pokemon.name}
      />
      <div className="caption">
        <span>
          <strong>{props.pokemon.name}</strong>
        </span>
      </div>
    </div>
  );
};

type PokeListProps = {
  pokemons: Array<Pokemon>
};

/**
 * Display a list of Pokemon
 */
class PokeList extends React.Component<PokeListProps> {
  render() {
    const pokemonPerRow = 12;

    const rows = [...Array(Math.ceil(this.props.pokemons.length / pokemonPerRow))];
    const pokemonsRows = rows.map((row: Array<Pokemon>, idx) =>
      this.props.pokemons.slice(idx * pokemonPerRow, idx * pokemonPerRow + pokemonPerRow)
    );
    const content = pokemonsRows.map((row, idx) => (
      <div className="row" key={idx}>
        {row.map(pokemon => <ThumbnailPokemon pokemon={pokemon} />)}
      </div>
    ));

    return <div>{content}</div>;
  }
}

export default PokeList;
